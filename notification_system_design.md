# Stage 1: Priority Inbox Design

### Approach
The approach evaluates incoming arrays by mapping specific categorical string values ("Placement", "Result", "Event") to integer weights (3, 2, 1). It uses JavaScript's native Array.prototype.sort() which runs at O(N log N) time complexity. 

1. **Primary Sort (Weight):** Placement (3) > Result (2) > Event (1).
2. **Secondary Sort (Recency):** Chronological timestamp fallback.

The mandatory telemetry middleware (`captureTelemetry`) is integrated at the very top of the execution block.
