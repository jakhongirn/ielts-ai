from rest_framework import serializers
from .models import UserPackage, Package, MockTest

class MockTestSerializer(serializers.Serializer):
    class Meta:
        model = MockTest
        fields = '__all__'


# serialize package and user package (credential)
class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'
        
class UserPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPackage
        fields = '__all__'
