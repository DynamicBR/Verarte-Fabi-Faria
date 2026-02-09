from tortoise import BaseDBAsyncClient

RUN_IN_TRANSACTION = True


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "image_url" VARCHAR(500),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "admins" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL UNIQUE,
    "verification_code" VARCHAR(6),
    "code_expires_at" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "buyers" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "verification_code" VARCHAR(20),
    "code_expires_at" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR(255) NOT NULL UNIQUE,
    "address" TEXT
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """


MODELS_STATE = (
    "eJztmltv2jAUx78KyhOTWAWMdtXeUspWpgJVm21VqyoyiQGriZPGzgqq+O6znfuFjGywEZ"
    "Snwrk49i/Hx/80vEmmpUODnNw4lu5qVPrUeJMwMCH7kHa1GhKw7cjBDRRMDRFre0HCCKaE"
    "OkAMNgMGgcykQ6I5yKbIwsyKXcPgRktjgQjPI5OL0YsLVWrNIV1Ahzken5gZYR0uIQm+2s"
    "/qDEFDT8wW6fzawq7SlS1sQ0w/i0B+tamqWYZr4ijYXtGFhcNohMUi5xBDB1DIh6eOy6fP"
    "Z+evNFiRN9MoxJtiLEeHM+AaNLbcLRloFub82GyIWOCcX+V9t9P72Dv/cNY7ZyFiJqHl49"
    "pbXrR2L1EQGCvSWvgBBV6EwBhxo4iy4TLo+gvg5LMLE1L42KTT+AJYRfwCQwQwKpodETTB"
    "UjUgntMFx3Z6WsDru3zbv5JvmyzqHV+NxQrZq/Cx7+p6Pg41ghifWQalApcbyjCV9kdA/X"
    "L7hzwL8CmDe4XP2STkxYhTa47kewHUXPme68n4SxAeo9y/nlyk4NoO0nIq9BJqyARGPtkw"
    "J8VU95JO/OTDLNgCwJeD/nAkXzc77VZX8GQ0EYXx0u2109XJVjqHqusYZbZ5IqkilZnc6a"
    "ft9hY7nUVt3OnCl2SpOZCvWAU0pyKZhyIT5gNNZqbr0k89CT4cZmVKbA36BBsr//YWtYLh"
    "aHCnyKObRD+4lJUB93QTvSCwNs9StyIcpPFjqFw1+NfGw2Q8EAQtQueOuGIUpzxIfE7ApZ"
    "aKrVcV6LEjObAGYNZcTMyeY8ciN0yB9vwKHF3NeKyutSk26zK7ZtoCMNtSug+XT9NXWLJu"
    "IpwnvTxHofACPKSWXZWTXeJviXYcxFdTdHW2asWdglbcybZiaAJU6kgLE3YDce8luH+ENi"
    "Dk1WL9awHIogzKTGIVke7lUeAndNAMaYBPjQHTS+3y3ORKiq+zLcimT/uI61lGdjEWKlza"
    "iB34udprM9Oc1Go20b2Ua61naz27az174a6EiMzoWc9RqGenPKTWs7WePbROUevZCiA8ND"
    "17FBKhVrQe223qtbu5XLvZ/yX+TtRufnOwK1F7/G8PaoF7RAI30evZ7SjVisKEKh6Xe+ns"
    "DDa7H6RM44ml1A0nbDgH8uAls8NWW0h5bxI8T6vwVUIUUz967XIj7/nRi0kskvvDg0JVRv"
    "7mRwfHKXT51igB0Q+vJsC9PH6xK1KIc4TW17vJeJOQDVNSIL9htsBHHWm01TAQoU+HibWA"
    "Il918fGSPklSKokP8N+Pl/Uv7FTQZg=="
)
