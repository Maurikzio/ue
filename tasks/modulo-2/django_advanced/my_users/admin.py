from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Additional information ', {'fields': ('phone',)}),
    )

    def get_groups(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])

    get_groups.short_description = 'Groups'

    list_display = ('email', 'username', 'phone', 'is_staff', 'get_groups')


admin.site.register(CustomUser, CustomUserAdmin)
