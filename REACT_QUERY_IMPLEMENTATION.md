# React Query Implementation Guide

## Overview

This project now uses **React Query (TanStack Query)** for server state management. The implementation follows best practices with custom hooks that encapsulate all query definitions.

## Architecture

### 1. Query Client Setup (`src/main.tsx`)

The QueryClient is configured with sensible defaults:
- **staleTime**: 5 minutes (data considered fresh for 5 minutes)
- **gcTime**: 10 minutes (garbage collection time)
- **retry**: 1 attempt
- **refetchOnWindowFocus**: false (prevents unnecessary refetches)

### 2. Custom Hooks Structure (`src/api/queries/`)

Each API domain has its own query file with:
- **Query Keys**: Structured keys for cache management
- **Query Hooks**: For fetching data
- **Mutation Hooks**: For creating, updating, deleting data

## Query Hooks Available

### Departments (`src/api/queries/departments.ts`)
```typescript
// Queries
useDepartments()                    // Get all departments
useDepartmentsWithPopulate()        // Get departments with populated data

// Mutations
useCreateDepartment()               // Create new department
useUpdateDepartments()              // Update departments
useDeleteDepartments()              // Delete departments
```

### Inventory (`src/api/queries/inventory.ts`)
```typescript
// Queries
useInventory()                      // Get all inventory items
useInventoryWithPopulate()          // Get inventory with populated data

// Mutations
useCreateInventoryItem()            // Create new inventory item
useUpdateInventoryItems()           // Update inventory items
```

### Equipment Types (`src/api/queries/equipmentType.ts`)
```typescript
// Queries
useEquipmentTypes()                 // Get all equipment types

// Mutations
useCreateEquipmentType()            // Create new equipment type
useUpdateEquipmentTypes()           // Update equipment types
useDeleteEquipmentTypes()           // Delete equipment types
```

### Solders (`src/api/queries/solders.ts`)
```typescript
// Queries
useSolders()                       // Get all solders
useSolderById(id)                  // Get specific solder

// Mutations
useCreateSolder()                  // Create new solder
useUpdateSolders()                 // Update solders
useDeleteSolders()                 // Delete solders
```

### Authentication (`src/api/queries/auth.ts`)
```typescript
// Queries
useCheckAuth()                     // Check authentication status

// Mutations
useLogin()                         // Login user
useLogout()                        // Logout user
```

## Usage Examples

### Basic Query Usage
```typescript
import { useDepartments } from '../api/queries';

function DepartmentsList() {
  const { data, isLoading, error } = useDepartments();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data.map(dept => (
        <div key={dept.id}>{dept.name}</div>
      ))}
    </div>
  );
}
```

### Mutation Usage
```typescript
import { useCreateDepartment } from '../api/queries';

function CreateDepartmentForm() {
  const createDepartment = useCreateDepartment();

  const handleSubmit = (formData) => {
    createDepartment.mutate(formData, {
      onSuccess: () => {
        // Form automatically refetches departments list
        console.log('Department created successfully!');
      },
      onError: (error) => {
        console.error('Failed to create department:', error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createDepartment.isPending}
      >
        {createDepartment.isPending ? 'Creating...' : 'Create Department'}
      </button>
    </form>
  );
}
```

### Optimistic Updates
```typescript
import { useUpdateDepartments } from '../api/queries';

function DepartmentsTable() {
  const updateDepartments = useUpdateDepartments();

  const handleUpdate = (updatedData) => {
    updateDepartments.mutate(updatedData, {
      onSuccess: () => {
        // Query automatically refetches
        toast.success('Departments updated successfully!');
      },
      onError: (error) => {
        toast.error('Failed to update departments');
      },
    });
  };
}
```

## Benefits of This Approach

### 1. **Separation of Concerns**
- API logic is separated from UI components
- Each domain has its own query file
- Easy to maintain and test

### 2. **Automatic Cache Management**
- Data is cached automatically
- Stale data is refetched when needed
- Optimistic updates for better UX

### 3. **Built-in Loading & Error States**
- `isLoading`, `isError`, `error` states available
- Automatic retry on failure
- Background refetching

### 4. **Automatic Invalidation**
- Mutations automatically invalidate related queries
- Cache is kept in sync with server state
- No manual cache management needed

### 5. **Type Safety**
- Full TypeScript support
- Query keys are type-safe
- Return types are inferred

## Migration from Loader Data

### Before (with React Router loaders):
```typescript
// loader.ts
export async function loader() {
  const data = await getAllDepartments();
  return data;
}

// Component.tsx
function Component() {
  const data = useLoaderData();
  return <div>{data.data.map(...)}</div>;
}
```

### After (with React Query):
```typescript
// Component.tsx
function Component() {
  const { data, isLoading, error } = useDepartments();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data?.data.map(...)}</div>;
}
```

## Best Practices

### 1. **Use Custom Hooks**
- Never use `useQuery` directly in components
- Always create custom hooks for reusability
- Keep query logic centralized

### 2. **Structured Query Keys**
- Use consistent key structure
- Include filters and parameters in keys
- Use TypeScript for type safety

### 3. **Error Handling**
- Always handle loading and error states
- Provide meaningful error messages
- Use toast notifications for user feedback

### 4. **Optimistic Updates**
- Use optimistic updates for better UX
- Handle rollback on error
- Show loading states during mutations

### 5. **Cache Management**
- Set appropriate `staleTime` and `gcTime`
- Invalidate related queries after mutations
- Use `queryClient.clear()` on logout

## Development Tools

The React Query DevTools are enabled in development mode. You can:
- Inspect cache state
- Manually invalidate queries
- Test query behavior
- Debug cache issues

## Performance Considerations

1. **Stale Time**: Set appropriate stale times to reduce unnecessary requests
2. **Garbage Collection**: Configure gcTime to manage memory usage
3. **Background Refetching**: Disable for critical data that shouldn't change
4. **Retry Logic**: Configure retry attempts based on your API reliability

This implementation provides a robust, scalable solution for server state management with excellent developer experience and user experience. 