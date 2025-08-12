import { BlogPost } from '../blog-posts';

export const adDomain: BlogPost = {
  id: "ad-domain",
  title: "Active Directory Domains",
  category: "activedirectory",
  body: `
# Active Directory Domains

Understanding Active Directory domains is fundamental to managing Windows-based enterprise networks. This guide covers the essential concepts of AD domains and their role in network organization.

## What is an Active Directory Domain?

An Active Directory domain is a logical grouping of network objects (computers, users, devices) that share a common directory database. A domain provides a central location for storing directory information and provides authentication and authorization services.

### Domain Characteristics

- **Single Administrative Boundary**: All objects within a domain share the same security policies
- **Unified Namespace**: Objects within a domain share a common DNS namespace
- **Centralized Authentication**: Users authenticate once to access domain resources
- **Trust Relationships**: Domains can establish trust relationships for resource sharing

## Domain Components

### Domain Controllers (DCs)
Domain controllers are servers that authenticate users and enforce security policies for a Windows domain.

### Organizational Units (OUs)
Containers within a domain that can hold users, groups, computers, and other organizational units.

### Domain Users and Groups
User accounts and security groups that define access permissions throughout the domain.
    `,
  headings: [
    { id: "what-is-an-active-directory-domain", text: "What is an Active Directory Domain?", level: 2 },
    { id: "domain-characteristics", text: "Domain Characteristics", level: 3 },
    { id: "domain-components", text: "Domain Components", level: 2 },
  ]
};