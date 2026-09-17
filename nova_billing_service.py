"""Usage metering and billing calculations for the Nova platform.

Aggregates raw usage events into billable consumption units and
computes usage-based charges for the current billing period.
"""

from datetime import datetime

from .timeout_config import USAGE_AGGREGATION_TIMEOUT_MS, USAGE_BATCH_SIZE


def aggregate_usage_events(customer_id: str, period_start: datetime, period_end: datetime) -> list[dict]:
    """Pull raw usage events for a customer and bucket them by resource type.

    Batches at USAGE_BATCH_SIZE and enforces USAGE_AGGREGATION_TIMEOUT_MS
    per batch to bound worst-case aggregation time for large tenants.
    """
    raise NotImplementedError


def calculate_metered_charges(customer_id: str, usage_events: list[dict], rate_card: dict) -> float:
    """Convert aggregated consumption into a dollar amount using the customer's rate card."""
    raise NotImplementedError
