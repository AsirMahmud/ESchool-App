# Generated migration file for finance app

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
from decimal import Decimal


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FinancialTransaction',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_type', models.CharField(choices=[('revenue', 'Revenue'), ('expense', 'Expense')], help_text='Type of transaction (revenue or expense)', max_length=20)),
                ('category', models.CharField(help_text='Category of the transaction', max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, help_text='Transaction amount', max_digits=12, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('description', models.TextField(help_text='Description of the transaction')),
                ('transaction_date', models.DateField(help_text='Date of the transaction')),
                ('payment_method', models.CharField(blank=True, choices=[('cash', 'Cash'), ('bank_transfer', 'Bank Transfer'), ('check', 'Check'), ('credit_card', 'Credit Card'), ('debit_card', 'Debit Card'), ('online', 'Online Payment'), ('other', 'Other')], help_text='Method of payment', max_length=20, null=True)),
                ('reference_id', models.CharField(blank=True, help_text='Reference ID (payment ID, salary ID, etc.)', max_length=100, null=True)),
                ('reference_type', models.CharField(blank=True, help_text='Type of reference (payment, salary, manual)', max_length=50, null=True)),
                ('notes', models.TextField(blank=True, help_text='Additional notes', null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(blank=True, help_text='User who created this transaction', null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Financial Transaction',
                'verbose_name_plural': 'Financial Transactions',
                'db_table': 'financial_transactions',
                'ordering': ['-transaction_date', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='FinancialSummary',
            fields=[
                ('summary_id', models.AutoField(primary_key=True, serialize=False)),
                ('period_type', models.CharField(choices=[('monthly', 'Monthly'), ('yearly', 'Yearly')], help_text='Type of summary period', max_length=20)),
                ('year', models.PositiveIntegerField(help_text='Year of the summary')),
                ('month', models.PositiveIntegerField(blank=True, help_text='Month of the summary (for monthly summaries)', null=True)),
                ('total_revenue', models.DecimalField(decimal_places=2, default=0.0, help_text='Total revenue for the period', max_digits=12)),
                ('total_expenses', models.DecimalField(decimal_places=2, default=0.0, help_text='Total expenses for the period', max_digits=12)),
                ('net_profit', models.DecimalField(decimal_places=2, default=0.0, help_text='Net profit (revenue - expenses)', max_digits=12)),
                ('student_fees_revenue', models.DecimalField(decimal_places=2, default=0.0, help_text='Revenue from student fees', max_digits=12)),
                ('salary_expenses', models.DecimalField(decimal_places=2, default=0.0, help_text='Total salary expenses', max_digits=12)),
                ('operational_expenses', models.DecimalField(decimal_places=2, default=0.0, help_text='Total operational expenses', max_digits=12)),
                ('transaction_count', models.PositiveIntegerField(default=0, help_text='Total number of transactions in this period')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Financial Summary',
                'verbose_name_plural': 'Financial Summaries',
                'db_table': 'financial_summaries',
                'ordering': ['-year', '-month'],
            },
        ),
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('budget_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(help_text='Budget name', max_length=200)),
                ('budget_type', models.CharField(choices=[('annual', 'Annual Budget'), ('quarterly', 'Quarterly Budget'), ('monthly', 'Monthly Budget')], help_text='Type of budget', max_length=20)),
                ('category', models.CharField(choices=[('revenue', 'Revenue Budget'), ('expense', 'Expense Budget')], help_text='Budget category', max_length=20)),
                ('year', models.PositiveIntegerField(help_text='Budget year')),
                ('quarter', models.PositiveIntegerField(blank=True, help_text='Budget quarter (1-4)', null=True)),
                ('month', models.PositiveIntegerField(blank=True, help_text='Budget month (1-12)', null=True)),
                ('budgeted_amount', models.DecimalField(decimal_places=2, help_text='Budgeted amount', max_digits=12, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))])),
                ('actual_amount', models.DecimalField(decimal_places=2, default=0.0, help_text='Actual amount spent/earned', max_digits=12)),
                ('variance', models.DecimalField(decimal_places=2, default=0.0, help_text='Variance (actual - budgeted)', max_digits=12)),
                ('variance_percentage', models.DecimalField(decimal_places=2, default=0.0, help_text='Variance percentage', max_digits=5)),
                ('description', models.TextField(blank=True, help_text='Budget description', null=True)),
                ('is_active', models.BooleanField(default=True, help_text='Whether this budget is active')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Budget',
                'verbose_name_plural': 'Budgets',
                'db_table': 'budgets',
                'ordering': ['-year', '-quarter', '-month'],
            },
        ),
        migrations.AddIndex(
            model_name='financialtransaction',
            index=models.Index(fields=['transaction_type'], name='financial__transac_3c8b8f_idx'),
        ),
        migrations.AddIndex(
            model_name='financialtransaction',
            index=models.Index(fields=['category'], name='financial__categor_9b8c3a_idx'),
        ),
        migrations.AddIndex(
            model_name='financialtransaction',
            index=models.Index(fields=['transaction_date'], name='financial__transac_8d4a5e_idx'),
        ),
        migrations.AddIndex(
            model_name='financialtransaction',
            index=models.Index(fields=['reference_type', 'reference_id'], name='financial__referen_7f2e1c_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='financialsummary',
            unique_together={('period_type', 'year', 'month')},
        ),
        migrations.AddIndex(
            model_name='financialsummary',
            index=models.Index(fields=['period_type', 'year', 'month'], name='financial__period__6a9d4b_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='budget',
            unique_together={('name', 'year', 'quarter', 'month')},
        ),
    ]

