# -*- coding: utf-8 -*-
# Generated by Django 1.11.27 on 2020-02-05 22:26
from __future__ import unicode_literals

from django.db import migrations


def delete_alert_rules_incidents(apps, schema_editor):
    from sentry.utils.query import RangeQuerySetWrapper

    Incident = apps.get_model("sentry", "Incident")
    AlertRule = apps.get_model("sentry", "AlertRule")
    TimeSeriesSnapshot = apps.get_model("sentry", "TimeSeriesSnapshot")
    QuerySubscription = apps.get_model("sentry", "QuerySubscription")

    for incident in RangeQuerySetWrapper(Incident.objects.all()):
        incident.delete()

    for alert_rule in RangeQuerySetWrapper(AlertRule.objects.all()):
        alert_rule.delete()

    for snapshot in RangeQuerySetWrapper(TimeSeriesSnapshot.objects.all()):
        snapshot.delete()

    for sub in RangeQuerySetWrapper(QuerySubscription.objects.all()):
        sub.delete()


class Migration(migrations.Migration):
    # This flag is used to mark that a migration shouldn't be automatically run in
    # production. We set this to True for operations that we think are risky and want
    # someone from ops to run manually and monitor.
    # General advice is that if in doubt, mark your migration as `is_dangerous`.
    # Some things you should always mark as dangerous:
    # - Large data migrations. Typically we want these to be run manually by ops so that
    #   they can be monitored. Since data migrations will now hold a transaction open
    #   this is even more important.
    # - Adding columns to highly active tables, even ones that are NULL.
    is_dangerous = False

    # This flag is used to decide whether to run this migration in a transaction or not.
    # By default we prefer to run in a transaction, but for migrations where you want
    # to `CREATE INDEX CONCURRENTLY` this needs to be set to False. Typically you'll
    # want to create an index concurrently when adding one to an existing table.
    atomic = False

    dependencies = [("sentry", "0030_auto_20200201_0039")]

    operations = [
        migrations.RunPython(delete_alert_rules_incidents, reverse_code=migrations.RunPython.noop)
    ]
