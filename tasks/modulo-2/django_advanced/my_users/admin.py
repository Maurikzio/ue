from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional information ', {'fields': ('phone',)}),
    )

    list_display = ('email', 'username', 'phone', 'is_staff')


admin.site.register(CustomUser, CustomUserAdmin)
