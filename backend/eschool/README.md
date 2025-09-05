# E-School Management System - Backend API

A comprehensive Django REST Framework API for managing educational institutions, built based on a detailed Entity-Relationship (EER) model.

## Features

- **Complete CRUD Operations** for all entities
- **JWT Authentication** with refresh tokens
- **Nested Relationships** with proper serialization
- **Advanced Filtering and Search** capabilities
- **Pagination** for large datasets
- **Comprehensive Validation** and error handling
- **RESTful API Design** following best practices

## Entities and Models

### Core Entities
- **Employee**: Staff management with roles, departments, and attendance
- **Teacher**: Extended employee model with teaching-specific features
- **Student**: Student management with academic records and activities
- **Parent**: Parent/guardian information and payment management
- **Department**: Academic and administrative departments
- **Level**: Academic levels (grades/classes)
- **Section**: Sections within levels
- **Subject**: Academic subjects with syllabi and materials

### Academic Management
- **Exam**: Examination management with scheduling
- **ExamResult**: Student exam results with grading
- **Attendance**: Student and employee attendance tracking
- **Class/Room**: Physical classroom and resource management
- **ClassSchedule**: Timetable management
- **ClassBooking**: Room booking system

### Financial Management
- **Payment**: Fee management and payment tracking
- **PaymentHistory**: Payment installment tracking
- **Finance**: Department financial reports
- **Scholarship**: Scholarship management

### Events and Activities
- **Event**: School events and activities
- **EventParticipant**: Event registration and participation
- **EventResource**: Event resource management
- **StudentActivity**: Student extracurricular activities

### Admission Management
- **Admission**: Student admission process
- **StudentDiary**: Assignment and task tracking

## Installation and Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- PostgreSQL (for production) or SQLite (for development)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd eschool-app/backend/eschool
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
```bash
# Copy the example environment file
cp env.example .env

# Edit .env file with your configuration
# For development, you can use the default SQLite settings
```

### 5. Database Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 6. Run the Development Server
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Documentation

### Authentication
All API endpoints require JWT authentication except for token endpoints.

#### Get Access Token
```bash
POST /api/auth/token/
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}
```

#### Refresh Token
```bash
POST /api/auth/token/refresh/
Content-Type: application/json

{
    "refresh": "your_refresh_token"
}
```

### API Endpoints

#### Core Entities
- `GET/POST /api/departments/` - Department management
- `GET/POST /api/employees/` - Employee management
- `GET/POST /api/teachers/` - Teacher management
- `GET/POST /api/students/` - Student management
- `GET/POST /api/parents/` - Parent management

#### Academic Management
- `GET/POST /api/levels/` - Academic levels
- `GET/POST /api/sections/` - Sections within levels
- `GET/POST /api/subjects/` - Academic subjects
- `GET/POST /api/exams/` - Examination management
- `GET/POST /api/attendance/` - Attendance tracking

#### Financial Management
- `GET/POST /api/payments/` - Payment management
- `GET/POST /api/finances/` - Financial reports
- `GET/POST /api/scholarships/` - Scholarship management

#### Resource Management
- `GET/POST /api/classes/` - Classroom management
- `GET/POST /api/class-schedules/` - Timetable management
- `GET/POST /api/events/` - Event management

### Example API Usage

#### Create a Department
```bash
POST /api/departments/
Authorization: Bearer your_access_token
Content-Type: application/json

{
    "d_name": "Computer Science",
    "location": "Building A, Floor 2",
    "d_type": "academic",
    "description": "Department of Computer Science and Engineering"
}
```

#### Create a Student
```bash
POST /api/students/
Authorization: Bearer your_access_token
Content-Type: application/json

{
    "student_number": "STU001",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "gender": "male",
    "date_of_birth": "2010-05-15",
    "enroll_date": "2024-01-15",
    "address": "123 Main St, City, State",
    "level": 1,
    "department": "Computer Science"
}
```

#### Get Students by Level
```bash
GET /api/students/?level=1
Authorization: Bearer your_access_token
```

#### Search Students
```bash
GET /api/students/?search=John
Authorization: Bearer your_access_token
```

## Database Schema

The system uses a comprehensive database schema with the following key relationships:

- **One-to-Many**: Department → Employees, Students
- **Many-to-Many**: Teachers ↔ Subjects, Students ↔ Activities
- **One-to-One**: Employee → Teacher (for teachers)
- **Foreign Keys**: All entities properly linked with referential integrity

## Features

### Advanced Filtering
- Filter by multiple fields simultaneously
- Date range filtering
- Status-based filtering
- Relationship-based filtering

### Search Functionality
- Full-text search across relevant fields
- Case-insensitive search
- Multi-field search

### Pagination
- Configurable page size (default: 20 items)
- Page-based navigation
- Total count information

### Validation
- Comprehensive field validation
- Business logic validation
- Custom validation rules

### Error Handling
- Detailed error messages
- HTTP status codes
- Validation error details

## Development

### Running Tests
```bash
python manage.py test
```

### Code Style
The project follows PEP 8 guidelines. Use a code formatter like `black` for consistent formatting.

### Adding New Features
1. Create models in appropriate app
2. Create serializers with validation
3. Create viewsets with CRUD operations
4. Add URL routing
5. Write tests
6. Update documentation

## Production Deployment

### Environment Variables
Set the following environment variables for production:

```bash
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:password@host:port/dbname
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

### Database
Use PostgreSQL for production:
```bash
pip install psycopg2-binary
```

### Static Files
```bash
python manage.py collectstatic
```

### Security
- Use HTTPS in production
- Set secure cookie settings
- Configure CORS properly
- Use environment variables for secrets

## API Response Format

### Success Response
```json
{
    "count": 100,
    "next": "http://localhost:8000/api/students/?page=2",
    "previous": null,
    "results": [
        {
            "s_id": "uuid",
            "student_number": "STU001",
            "name": "John Doe",
            "email": "john.doe@example.com",
            ...
        }
    ]
}
```

### Error Response
```json
{
    "field_name": [
        "This field is required."
    ],
    "non_field_errors": [
        "Custom validation error message."
    ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.



