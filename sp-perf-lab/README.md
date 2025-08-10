# Stored Procedure Performance Lab

Purpose: A reproducible lab to compare naive vs optimized MySQL stored procedures using synthetic OLTP-style data. Benchmarks run via a .NET console harness (Dapper) and output JSON results for visualization.

## What The Benchmark App Does

The console app executes a list of stored procedure (or simple SQL) benchmarks repeatedly and records latency distribution metrics per case.

Workflow per benchmark case:
1. Open (or reuse) MySQL connection.
2. (Planned) Warmup executions (optional future step).
3. Time N iterations (Stopwatch) of the target CALL.
4. Collect per-iteration durations; compute average, p95, p99.
5. (Planned) Capture engine counters (e.g. Handler_read_rnd_next diffs) and count rows returned.
6. Append structured result to in-memory list.
7. At end, write JSON file (includes per-case metrics, iteration count, environment tag).

Use case: Establish baseline on naive procs, apply tuning (indexes, rewrites, schema changes), re-run to quantify improvement and document findings.

## High-Level Roadmap

1. Schema & Seed Data
2. Naive Procedures (baseline)
3. Benchmark Harness (initial timing + percentiles) ✅ initial
4. Optimization Passes (indexes, covering queries, batching, temp tables)
5. Metrics Collection (rows read/returned, handler stats) ⏳
6. Result Visualization (HTML/Chart.js or notebook)
7. Additional Scenarios (pagination, filtering, aggregation)
8. Documentation of Findings

## Folder Structure

- bench/ : .NET 9 console app benchmark harness
- schema/ : DDL scripts (tables, indexes)
- procedures/naive : Baseline stored procedures
- procedures/ledger : Ledger-focused procedures (current work)
- procedures/optimized : Improved variants with rationale
- results/ : Raw JSON benchmark output files
- docs/ : Explanations & tuning case studies
- infra/ : Docker Compose, MySQL config
- scripts/ : Data generation or utility scripts

## Running Benchmarks

1. Edit `bench/benchconfig.json`:
```
{
  "environment": "dev",
  "connectionString": "server=localhost;port=3306;user=root;password=YOURPWD;database=dtl_kentonky",
  "iterations": 200
}
```
2. (Optional) Ensure procedures created in target DB (see `procedures/` scripts).
3. Run: `dotnet run --project bench/BenchRunner.csproj`
4. Observe console output (avg / p95 / p99 per case).
5. Inspect generated JSON in `bench/bin/Debug/net9.0/` or `results/` (depending on implementation).

## Interpreting Output

Fields per benchmark:
- Name: Identifier of stored proc / case.
- Iterations: Number of timed executions.
- AvgMs: Mean latency (ms).
- P95Ms / P99Ms: Tail latency (higher percentiles show worst 5% / 1%).
- RowsRead / RowsReturned: Currently placeholders; future metrics to explain cost.

Low iteration counts (<30) produce unstable p95/p99; increase iterations (200–500) for meaningful tails.

## Planned Enhancements

- Warmup phase (discard cold-start variance).
- Real rows returned (materialize result set length) & approximate rows read (handler status diffs).
- Tag results with git commit, MySQL version, schema hash.
- Optimized procedure variants (covering indexes, pagination strategies, summary pre-aggregation).
- Visualization (static HTML + Chart.js) for comparing baseline vs optimized JSON snapshots.

## Extending

Add a new benchmark: modify the benches list in `Program.cs` with a tuple `("name", async conn => { await conn.QueryAsync("CALL your_proc(...)" ); })`.

## Disclaimer

Synthetic example for learning. Not production guidance.
