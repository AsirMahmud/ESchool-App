from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from decimal import Decimal

from parent.models import Payment
from employee.models import EmployeeSalary
from .models import FinancialTransaction


@receiver(post_save, sender=Payment)
def create_payment_transaction(sender, instance, created, **kwargs):
    """Create financial transaction when a payment is marked as paid"""
    if instance.status == 'paid' and instance.payment_date:
        # Check if transaction already exists
        existing_transaction = FinancialTransaction.objects.filter(
            reference_type='payment',
            reference_id=str(instance.pay_id)
        ).first()
        
        if not existing_transaction:
            FinancialTransaction.objects.create(
                transaction_type='revenue',
                category='student_fees',
                amount=instance.total_amount,
                description=f"Student fee payment - {instance.get_payment_type_display()} - {instance.student.name}",
                transaction_date=instance.payment_date,
                payment_method=instance.payment_method,
                reference_id=str(instance.pay_id),
                reference_type='payment',
                notes=instance.description
            )


@receiver(post_save, sender=EmployeeSalary)
def create_salary_transaction(sender, instance, created, **kwargs):
    """Create financial transaction when a salary is marked as paid"""
    if instance.status == 'paid' and instance.paid_date:
        # Check if transaction already exists
        existing_transaction = FinancialTransaction.objects.filter(
            reference_type='salary',
            reference_id=str(instance.sal_id)
        ).first()
        
        if not existing_transaction:
            FinancialTransaction.objects.create(
                transaction_type='expense',
                category='salaries',
                amount=instance.net_salary,
                description=f"Salary payment - {instance.employee.name} ({instance.month})",
                transaction_date=instance.paid_date,
                payment_method='bank_transfer',  # Default for salaries
                reference_id=str(instance.sal_id),
                reference_type='salary',
                notes=instance.notes
            )


@receiver(post_delete, sender=Payment)
def delete_payment_transaction(sender, instance, **kwargs):
    """Delete financial transaction when a payment is deleted"""
    FinancialTransaction.objects.filter(
        reference_type='payment',
        reference_id=str(instance.pay_id)
    ).delete()


@receiver(post_delete, sender=EmployeeSalary)
def delete_salary_transaction(sender, instance, **kwargs):
    """Delete financial transaction when a salary record is deleted"""
    FinancialTransaction.objects.filter(
        reference_type='salary',
        reference_id=str(instance.sal_id)
    ).delete()

