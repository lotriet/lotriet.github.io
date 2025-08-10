#r "nuget: MySql.Data, 9.4.0"
#r "nuget: Dapper, 2.1.66"
using MySql.Data.MySqlClient;
using Dapper;
using System.Security.Cryptography;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

var connStr = Environment.GetEnvironmentVariable("PERF_LAB_CS") ?? "server=localhost;port=3306;user=root;password=Password123!;database=perf_lab";
var customers = 5000;
var products = 400;
var ordersPerCustomerAvg = 12;
var rand = RandomNumberGenerator.Create();
byte[] buf = new byte[8];

using (var conn = new MySqlConnection(connStr))
{
    await conn.OpenAsync();

    string RandomString(int len)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var s = new char[len];
        for (int i = 0; i < len; i++) { rand.GetBytes(buf); s[i] = chars[buf[0] % chars.Length]; }
        return new string(s);
    }

    Console.WriteLine("Seeding customers...");
    await conn.ExecuteAsync("INSERT INTO customers(name, region_code, created_utc) VALUES " + string.Join(',', Enumerable.Range(0, customers).Select(_ => $"('C{Guid.NewGuid():N}','{RandomString(2)}',UTC_TIMESTAMP())")));

    Console.WriteLine("Seeding products...");
    await conn.ExecuteAsync("INSERT INTO products(sku,name,unit_price_cents,active) VALUES " + string.Join(',', Enumerable.Range(0, products).Select(i => $"('SKU{i}','Product {i}',{(100 + i % 50) * 100},1)")));

    Console.WriteLine("Seeding orders + items (streamed)...");

    var customerIds = (await conn.QueryAsync<long>("SELECT customer_id FROM customers")).ToList();
    var productIds = (await conn.QueryAsync<long>("SELECT product_id FROM products")).ToList();
    var rng = new Random();

    int orders = 0;
    var orderValues = new List<string>();

    foreach (var cid in customerIds)
    {
        var count = (int)Math.Max(1, Math.Round(Normal(ordersPerCustomerAvg, 4, rng)));
        for (int i = 0; i < count; i++)
        {
            int items = rng.Next(1, 5);
            int total = 0;
            var created = DateTime.UtcNow.AddMinutes(-rng.Next(0, 60 * 24 * 30));
            orderValues.Add($"({cid},0,'PENDING','{created:yyyy-MM-dd HH:mm:ss}')");
            orders++;
            if (orderValues.Count == 1000)
            {
                await FlushOrders();
            }
        }
    }
    if (orderValues.Count > 0) await FlushOrders();

    Console.WriteLine($"Inserted {orders} orders. TODO: add order_items seeding logic.");

    async Task FlushOrders()
    {
        var sql = "INSERT INTO orders(customer_id,order_total_cents,status,created_utc) VALUES " + string.Join(',', orderValues);
        await conn.ExecuteAsync(sql);
        orderValues.Clear();
    }

    double Normal(double mean, double stdDev, Random r)
    {
        // Box-Muller
        var u1 = 1.0 - r.NextDouble();
        var u2 = 1.0 - r.NextDouble();
        var randStdNormal = Math.Sqrt(-2.0 * Math.Log(u1)) * Math.Sin(2.0 * Math.PI * u2);
        return mean + stdDev * randStdNormal;
    }
}
