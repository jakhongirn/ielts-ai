from rest_framework import serializers
from .models import UserPackage, Package


# serialize package and user package (credential)
class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'
        
class UserPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPackage
        fields = '__all__'
        