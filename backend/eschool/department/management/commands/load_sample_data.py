from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth.models import User
from department.models import Department
from level.models import Level
from subject.models import Subject
from classroom.models import Class
from student.models import Scholarship


class Command(BaseCommand):
    help = 'Load sample data for testing the E-School API'

    def handle(self, *args, **options):
        self.stdout.write('Loading sample data...')
        
        # Create superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            self.stdout.write('Creating admin user...')
            User.objects.create_superuser(
                username='admin',
                email='admin@eschool.com',
                password='admin123'
            )
            self.stdout.write(
                self.style.SUCCESS('Admin user created: username=admin, password=admin123')
            )
        
        # Load fixtures
        try:
            call_command('loaddata', 'fixtures/sample_data.json')
            self.stdout.write(
                self.style.SUCCESS('Sample data loaded successfully!')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error loading sample data: {e}')
            )
        
        # Display summary
        self.stdout.write('\nData Summary:')
        self.stdout.write(f'Departments: {Department.objects.count()}')
        self.stdout.write(f'Levels: {Level.objects.count()}')
        self.stdout.write(f'Subjects: {Subject.objects.count()}')
        self.stdout.write(f'Classes/Rooms: {Class.objects.count()}')
        self.stdout.write(f'Scholarships: {Scholarship.objects.count()}')
        
        self.stdout.write('\nAPI Endpoints:')
        self.stdout.write('GET /api/departments/ - List all departments')
        self.stdout.write('GET /api/levels/ - List all levels')
        self.stdout.write('GET /api/subjects/ - List all subjects')
        self.stdout.write('GET /api/classes/ - List all classes/rooms')
        self.stdout.write('GET /api/scholarships/ - List all scholarships')
        
        self.stdout.write('\nAuthentication:')
        self.stdout.write('POST /api/auth/token/ - Get JWT token')
        self.stdout.write('Use username: admin, password: admin123')



