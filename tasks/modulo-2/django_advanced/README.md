# Django REST Framework API - Sistema de Gestión de Citas Médicas

## Introducción
API REST desarrollada con Django y Django REST Framework para gestionar citas médicas. El sistema permite la interacción entre pacientes, doctores y administradores, implementando diferentes niveles de acceso y funcionalidades específicas para cada rol.

## Instalación

1. Clona el repositorio
```bash
git clone https://github.com/Maurikzio/ue.git

# seleccionar rama del modulo
modulo-2

# dirigirse al directorio de la tarea
cd tasks/modulo-2/django_advanced
```

2. Instalar dependencias
```bash
pip install -r requirements.txt
```

3. Realizar migraciones
```bash
python manage.py migrate
```

4. Crear superusuario
```bash
python manage.py createsuperuser
```

## Uso

### Endpoints

#### Usuarios
- `POST /api/users/register/patient/` - Registro de pacientes
  ```bash
    {
      "email": "paciente.pedro@gmail.com",
      "username": "paciente.pedro",
      "password": "1a.2b.3c.4d",
      "phone": "123456789"
    }
  ```
- `POST /api/users/register/doctor/` - Registro de doctores (requiere ser admin)
  ```bash
    {
      "email": "doctor.martinez@gmail.com",
      "username": "doctor.martinez",
      "password": "1a.2b.3c.4d",
      "phone": "123456789"
    }
  ```
- `POST /api/users/register/admin/` - Registro de doctores (requiere ser admin)
  ```bash
    {
      "email": "nuevo.admin@gmail.com",
      "username": "nuevo.admin",
      "password": "1a.2b.3c.4d",
      "phone": "123456789"
    }
  ```
- `GET /api/users/register/doctors/` - Lista de doctores disponibles

#### Servicios (requiere ser admin)
- `GET /api/services/` - Lista todos los servicios
- `POST /api/services/` - Crea un nuevo servicio
- `GET /api/services/{id}/` - Detalle de un servicio
- `PUT /api/services/{id}/` - Actualiza un servicio
- `DELETE /api/services/{id}/` - Elimina un servicio

#### Citas (requiere estar autenticado)
- `GET /api/appointments/` - Lista citas (filtradas según el rol del usuario requiere autenticacion)
- `POST /api/appointments/` - Crea una nueva cita (solo pacientes)
- `PUT /api/appointments/{id}/status/` - Actualiza estado de cita (requiere ser admin)

### Extra
- `GET /appointments/most-booked-service` - El servicio que mas veces ha sido agendado.
  ```bash
    [
      {
        "service__name": "Examen Físico Completo",
        "service__id": 4,
        "appointment_count": 2
      }
    ]
  ```

### Roles y Permisos
- **Administradores**: Acceso total al sistema
- **Doctores**: Pueden ver sus citas asignadas
- **Pacientes**: Pueden crear citas, ver sus propias citas y tambien pueden ver la lista de doctores.

## Notas
- La API utiliza autenticación básica
- Los tokens de autenticación deben incluirse en las cabeceras de las peticiones
- Para probar los endpoints, se recomienda usar herramientas como Postman
