# Tuning Case: <title>

## Context
Describe scenario & query/procedure purpose.

## Baseline
- Procedure: name & definition snippet
- Indexes present
- Benchmark metrics (avg, p95, p99, rows read, rows returned)
- EXPLAIN output

## Hypothesis
What is likely causing slowness (e.g., full scan, filesort, temp table)?

## Change
What you changed (index, rewritten join, covering index, pagination pattern, etc.)

## Result
Updated metrics side-by-side.

## Analysis
Interpretation of differences (why improved or regressed).

## Takeaways
Short bullet list of lessons.
