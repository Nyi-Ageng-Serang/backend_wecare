
# Backend WeCare
## Using Express JS
## Step 
- Install Dependencies || npm install
- Konfigurasi Environment || cp .env.example .env
- Jalankan project || npm run dev
- Akses Aplikasi || http://localhost:3000


## API Reference

### Register User

```http
  POST /auth/register
```

##### Body raw(json)
```
{
  "fullName": "Coba Nama",
  "email": "email@yahoo.com",
  "password": "elss4321",
  "confirmPassword": "elss4321"
}

```

### Login User

```http
  POST /auth/login
```
##### Body raw(json)
```
{
  "email": "email@yahoo.com",
  "password": "elss4321"
}

```

### Detail Profile

```http
  GET /auth/profile
```
##### Authorization (Bearer Token)
```
Token
<token>

```

### Update Profile

```http
  PUT /auth/profile
```
##### Authorization (Bearer Token)
```
Token
<token>

```
##### Body raw(json)
```
{
  "fullName": "Name Update",
  "email": "updateemail@yahoo.com",
  "birthDate": "1991-12-01",
  "trainingRecommendation": "Copywriting"
}


```
