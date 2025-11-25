export const mockConnections = [
  { 
    id: 1, 
    name: 'Production DB', 
    provider: 'postgresql', 
    host: 'db.prod.example.com',
    port: 5432,
    database: 'app_production',
    username: 'admin',
    status: 'active',
    createdAt: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'Staging MongoDB', 
    provider: 'mongodb', 
    host: 'mongo.staging.local',
    port: 27017,
    database: 'app_staging',
    username: 'dev',
    status: 'inactive',
    createdAt: '2024-02-20'
  },
  { 
    id: 3, 
    name: 'Analytics Redis', 
    provider: 'redis', 
    host: 'redis.analytics.io',
    port: 6379,
    database: 'analytics',
    username: 'redis_user',
    status: 'active',
    createdAt: '2024-03-10'
  }
]

export const mockSchema = {
  schemas: [
    {
      name: 'public',
      tables: [
        {
          name: 'users',
          columns: [
            { name: 'id', type: 'integer', primaryKey: true },
            { name: 'email', type: 'varchar(255)', nullable: false },
            { name: 'name', type: 'varchar(100)' },
            { name: 'created_at', type: 'timestamp' },
            { name: 'updated_at', type: 'timestamp' }
          ]
        },
        {
          name: 'orders',
          columns: [
            { name: 'id', type: 'integer', primaryKey: true },
            { name: 'user_id', type: 'integer', foreignKey: 'users.id' },
            { name: 'total', type: 'decimal(10,2)' },
            { name: 'status', type: 'varchar(50)' },
            { name: 'created_at', type: 'timestamp' }
          ]
        },
        {
          name: 'products',
          columns: [
            { name: 'id', type: 'integer', primaryKey: true },
            { name: 'name', type: 'varchar(200)' },
            { name: 'price', type: 'decimal(10,2)' },
            { name: 'stock', type: 'integer' },
            { name: 'category', type: 'varchar(100)' }
          ]
        }
      ]
    }
  ]
}

export const mockChatResponses = [
  {
    trigger: ['list', 'tables', 'show'],
    response: `Here are all the tables in your database:

\`\`\`sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
\`\`\`

**Results:**
- users
- orders
- products`
  },
  {
    trigger: ['convert', 'postgresql', 'postgres'],
    response: `I can help you convert that query! Here's the PostgreSQL version:

\`\`\`sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name
ORDER BY order_count DESC;
\`\`\`

Key changes:
- Uses standard LEFT JOIN syntax
- GROUP BY includes all non-aggregated columns
- Added ORDER BY for better results`
  },
  {
    trigger: ['explain', 'query'],
    response: `This query retrieves all active users who have placed orders in the last 30 days.

**Breakdown:**
1. **JOIN** - Combines user and order data based on user_id
2. **WHERE** - Filters orders created in the last 30 days using created_at
3. **GROUP BY** - Groups results by user for aggregation

**Performance tips:**
- Add index on orders.created_at for faster filtering
- Consider adding index on orders.user_id for JOIN performance`
  },
  {
    trigger: ['migration', 'alter', 'add column'],
    response: `Here's a migration to add that column:

\`\`\`sql
-- Add column
ALTER TABLE users 
ADD COLUMN phone VARCHAR(20);

-- Add index for better query performance
CREATE INDEX idx_users_phone 
ON users(phone);

-- Add comment
COMMENT ON COLUMN users.phone IS 'User contact phone number';
\`\`\`

This migration safely adds the phone column with proper indexing.`
  },
  {
    trigger: ['mysql', 'convert mysql'],
    response: `Here's the MySQL equivalent:

\`\`\`sql
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.name;
\`\`\`

**MySQL-specific features used:**
- DATE_SUB() for date arithmetic
- NOW() for current timestamp
- INTERVAL keyword for time periods`
  }
]

export const getResponseForMessage = (message) => {
  const lowerMessage = message.toLowerCase()

  for (const resp of mockChatResponses) {
    if (resp.trigger.some(keyword => lowerMessage.includes(keyword))) {
      return resp.response
    }
  }

  return `I understand you're asking about "${message}". I can help you with:

- Converting SQL between dialects
- Explaining query logic
- Generating migrations
- Listing database objects

Try asking something like "List all tables" or "Convert this to PostgreSQL"`
}
