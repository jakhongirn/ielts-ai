from django.contrib import admin
from .models import UserPackage, Package

# Register your models here.

class UserPackageAdmin(admin.ModelAdmin):
    pass

class PackageAdmin(admin.ModelAdmin):
    pass

admin.site.register(UserPackage, UserPackageAdmin)
admin.site.register(Package, PackageAdmin)