// See https://aka.ms/new-console-template for more information
// Console.WriteLine("Hello, World!");

using System.Data;
using MySql.Data.MySqlClient;
using Dapper;
using System.Diagnostics;
using System.Text.Json;

public record BenchmarkResult(string Name, int Iterations, double AvgMs, double P95Ms, double P99Ms, long RowsRead, long RowsReturned);

class Program
{
    static async Task<int> Main(string[] args)
    {
        var config = BenchmarkConfig.Load();
        Console.WriteLine($"Running benchmark environment '{config.EnvironmentName}' against {config.ConnectionString}" );

        var benches = new (string name, Func<IDbConnection, Task> action)[]
        {
            ("ping", async conn => { await conn.ExecuteAsync("SELECT 1"); }),
            // ("get_orders_naive", async conn => { await conn.QueryAsync("CALL sp_get_orders_naive(12345)"); }) // placeholder
        };

        var results = new List<BenchmarkResult>();
        using var connection = new MySqlConnection(config.ConnectionString);
        await connection.OpenAsync();

        foreach (var (name, action) in benches)
        {
            var iterations = config.Iterations;
            var timings = new List<double>(iterations);
            for (int i = 0; i < iterations; i++)
            {
                var sw = Stopwatch.StartNew();
                await action(connection);
                sw.Stop();
                timings.Add(sw.Elapsed.TotalMilliseconds);
            }
            timings.Sort();
            double avg = timings.Average();
            double p95 = Percentile(timings, 0.95);
            double p99 = Percentile(timings, 0.99);
            // TODO: capture rows read/returned via performance_schema or SHOW STATUS (future)
            results.Add(new BenchmarkResult(name, iterations, avg, p95, p99, 0, 0));
            Console.WriteLine($"{name}: avg={avg:F2}ms p95={p95:F2}ms p99={p99:F2}ms" );
        }

        var json = JsonSerializer.Serialize(results, new JsonSerializerOptions { WriteIndented = true });
        Directory.CreateDirectory(Path.Combine(AppContext.BaseDirectory, "results"));
        var outFile = Path.Combine(AppContext.BaseDirectory, "results", $"bench-{DateTime.UtcNow:yyyyMMddHHmmss}.json");
        await File.WriteAllTextAsync(outFile, json);
        Console.WriteLine($"Wrote {outFile}");
        return 0;
    }

    static double Percentile(List<double> sorted, double p)
    {
        if (sorted.Count == 0) return 0;
        var position = (sorted.Count - 1) * p;
        var lower = (int)Math.Floor(position);
        var upper = (int)Math.Ceiling(position);
        if (lower == upper) return sorted[lower];
        var weight = position - lower;
        return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }
}

class BenchmarkConfig
{
    public string EnvironmentName { get; set; } = "dev";
    public string ConnectionString { get; set; } = "server=localhost;port=3306;user=root;password=Password123!;database=perf_lab";
    public int Iterations { get; set; } = 5;

    public static BenchmarkConfig Load()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "benchconfig.json");
        if (File.Exists(path))
        {
            try
            {
                var json = File.ReadAllText(path);
                var cfg = JsonSerializer.Deserialize<BenchmarkConfig>(json);
                if (cfg != null) return cfg;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to parse benchconfig.json: {ex.Message}. Using defaults.");
            }
        }
        return new BenchmarkConfig();
    }
}
