export const dbProviders = [
  { 
    id: 'postgresql', 
    name: 'PostgreSQL', 
    icon: '🐘', 
    color: '#336791', 
    port: 5432,
    description: 'Advanced open-source relational database'
  },
  { 
    id: 'mysql', 
    name: 'MySQL', 
    icon: '🐬', 
    color: '#4479A1', 
    port: 3306,
    description: 'Popular open-source relational database'
  },
  { 
    id: 'mongodb', 
    name: 'MongoDB', 
    icon: '🍃', 
    color: '#47A248', 
    port: 27017,
    description: 'NoSQL document database'
  },
  { 
    id: 'sqlite', 
    name: 'SQLite', 
    icon: '💾', 
    color: '#003B57', 
    port: null,
    description: 'Lightweight embedded database'
  },
  { 
    id: 'oracle', 
    name: 'Oracle', 
    icon: '🔴', 
    color: '#F80000', 
    port: 1521,
    description: 'Enterprise relational database'
  },
  { 
    id: 'redis', 
    name: 'Redis', 
    icon: '⚡', 
    color: '#DC382D', 
    port: 6379,
    description: 'In-memory data structure store'
  },
  { 
    id: 'kafka', 
    name: 'Kafka', 
    icon: '📨', 
    color: '#231F20', 
    port: 9092,
    description: 'Distributed event streaming platform'
  },
  { 
    id: 'mariadb', 
    name: 'MariaDB', 
    icon: '🦭', 
    color: '#003545', 
    port: 3306,
    description: 'MySQL-compatible database'
  },
  { 
    id: 'cassandra', 
    name: 'Cassandra', 
    icon: '💫', 
    color: '#1287B1', 
    port: 9042,
    description: 'Distributed NoSQL database'
  },
  { 
    id: 'elasticsearch', 
    name: 'Elasticsearch', 
    icon: '🔍', 
    color: '#005571', 
    port: 9200,
    description: 'Search and analytics engine'
  }
]

export const getProviderById = (id) => {
  return dbProviders.find(p => p.id === id)
}

export const getProviderColor = (id) => {
  const provider = getProviderById(id)
  return provider ? provider.color : '#10b981'
}
