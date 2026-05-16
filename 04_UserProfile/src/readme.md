# Redis Commands: GET, SET, HGET, and HSET

Redis is an in-memory key-value database widely used for caching, session storage, and high-performance applications.

This document explains the difference between:

- `GET`
- `SET`
- `HGET`
- `HSET`

along with examples and real-world use cases.

---

# Table of Contents

1. Introduction
2. Redis String Commands
3. SET Command
4. GET Command
5. Redis Hash Commands
6. HSET Command
7. HGET Command
8. Key Differences
9. Real-World Examples
10. Performance Considerations
11. Summary
12. Conclusion

---

# Introduction

Redis supports multiple data structures such as:

- Strings
- Hashes
- Lists
- Sets
- Sorted Sets

The commands:

- `SET`
- `GET`

work with **String** data types.

The commands:

- `HSET`
- `HGET`

work with **Hash** data types.

Understanding these commands is important for building scalable applications.

---

# Redis String Commands

Redis Strings are the simplest Redis data type.

A string stores:

```text
key => value
```

Example:

```bash
SET username "Avinash"
```

---

# SET Command

The `SET` command stores a value for a key.

## Syntax

```bash
SET key value
```

## Example

```bash
SET city "Delhi"
```

Stored as:

```text
city => "Delhi"
```

## Retrieving the Value

```bash
GET city
```

### Output

```bash
"Delhi"
```

---

# Features of SET

- Fast operations
- Simple key-value storage
- Supports expiration
- Used for caching
- Can overwrite existing values

---

# Additional Examples

## Store Number

```bash
SET age 21
```

## Store JSON String

```bash
SET user '{"name":"Avinash","age":21}'
```

## Set Expiration Time

```bash
SET token "abc123" EX 60
```

This key expires after 60 seconds.

---

# GET Command

The `GET` command retrieves the value of a key.

## Syntax

```bash
GET key
```

## Example

```bash
GET city
```

### Output

```bash
"Delhi"
```

---

# Important Notes About GET

- Works only with string keys
- Returns `nil` if key does not exist
- Retrieves the complete value
- Cannot access individual fields inside JSON

---

# Problem with GET/SET for Structured Data

Suppose we store:

```bash
SET user '{"name":"Avinash","age":21}'
```

If we only want to update the age:

1. Fetch entire JSON
2. Modify JSON
3. Store again

This becomes inefficient for large objects.

That is where Redis Hashes help.

---

# Redis Hash Commands

Redis Hashes store data in field-value pairs.

Structure:

```text
hash => field => value
```

Similar to:

- JavaScript Objects
- Python Dictionaries
- JSON Objects

---

# HSET Command

`HSET` stores field-value pairs inside a hash.

## Syntax

```bash
HSET hash field value
```

---

# Example

```bash
HSET user:1 name "Avinash"
HSET user:1 age 21
HSET user:1 city "Delhi"
```

Stored internally as:

```json
{
  "name": "Avinash",
  "age": 21,
  "city": "Delhi"
}
```

---

# Advantages of HSET

- Better for structured data
- Individual field updates
- Memory efficient
- Faster partial updates
- Cleaner organization

---

# Updating Single Field

```bash
HSET user:1 age 22
```

Only the `age` field changes.

---

# HGET Command

`HGET` retrieves a specific field from a Redis Hash.

## Syntax

```bash
HGET hash field
```

---

# Example

```bash
HGET user:1 name
```

### Output

```bash
"Avinash"
```

---

# Another Example

```bash
HGET user:1 city
```

### Output

```bash
"Delhi"
```

---

# Why HGET is Useful

Instead of retrieving the entire object, we can retrieve only required fields.

Benefits:

- Faster response
- Reduced memory usage
- Better performance
- Lower network transfer

---

# Key Differences

| Command | Data Type | Purpose |
|----------|-----------|----------|
| SET | String | Store normal value |
| GET | String | Retrieve normal value |
| HSET | Hash | Store field-value pair |
| HGET | Hash | Retrieve specific field |

---

# Visual Comparison

## Using SET

```bash
SET user '{"name":"Avinash","age":21}'
```

Stored as:

```text
user => complete JSON string
```

---

## Using HSET

```bash
HSET user:1 name "Avinash"
HSET user:1 age 21
```

Stored as:

```text
user:1
   ├── name => Avinash
   └── age  => 21
```

---

# Real-World Examples

# Example 1: Authentication Token

```bash
SET auth_token "xyz123"
```

Retrieve:

```bash
GET auth_token
```

---

# Example 2: User Profile

```bash
HSET user:101 name "Avinash"
HSET user:101 email "avinash@example.com"
HSET user:101 role "Developer"
```

Retrieve Name:

```bash
HGET user:101 name
```

---

# Example 3: Product Data

```bash
HSET product:1 name "Laptop"
HSET product:1 price 50000
HSET product:1 stock 25
```

---

# Example 4: Updating Product Stock

```bash
HSET product:1 stock 24
```

Only stock gets updated.

---

# Performance Considerations

Redis is extremely fast because data is stored in memory.

Choosing the right data type improves:

- Speed
- Memory efficiency
- Scalability

---

# When to Use SET/GET

Use for:

- Tokens
- OTPs
- Cache values
- Simple counters
- Feature flags

---

# When to Use HSET/HGET

Use for:

- User profiles
- Product details
- Configuration objects
- Metadata
- Structured entities

---

# Summary

| Feature | GET/SET | HGET/HSET |
|----------|----------|------------|
| Data Type | String | Hash |
| Structure | Single Value | Field-Value |
| Best For | Simple Data | Structured Data |
| Partial Updates | No | Yes |
| Memory Efficient | Less | More |
| Real Use Cases | Tokens, Cache | Users, Products |

---

# Conclusion

`SET` and `GET` are used for simple key-value storage.

`HSET` and `HGET` are used for structured data where multiple related fields belong to the same entity.

In simple words:

- Use `SET/GET` for plain values
- Use `HSET/HGET` for object-like structured data

Choosing the correct Redis data structure helps improve:

- Performance
- Maintainability
- Scalability
- Memory optimization

For modern applications, Redis Hashes are commonly preferred for storing entities like users, products, and configurations.