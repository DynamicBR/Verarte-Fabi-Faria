from tortoise import fields, models


class Admin(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100, unique=True)
    password_hash = fields.CharField(max_length=255, unique=True)

    verification_code = fields.CharField(max_length=6, null=True)
    code_expires_at = fields.DatetimeField(null=True)

    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "admins"

    def __str__(self):
        return self.name
