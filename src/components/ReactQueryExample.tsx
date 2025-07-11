import { useDepartments, useCreateDepartment } from '../api/queries';

const ReactQueryExample: React.FC = () => {
  // Use React Query hooks
  const { data: departments, isLoading, error } = useDepartments();
  const createDepartment = useCreateDepartment();

  const handleCreateDepartment = () => {
    const newDepartment = {
      name: 'New Department',
      description: 'A new department created with React Query',
    };

    createDepartment.mutate(newDepartment, {
      onSuccess: () => {
        console.log('Department created successfully!');
        // The departments list will automatically refetch
      },
      onError: (error) => {
        console.error('Failed to create department:', error);
      },
    });
  };

  if (isLoading) {
    return <div>Loading departments...</div>;
  }

  if (error) {
    return <div>Error loading departments: {error.message}</div>;
  }

  return (
    <div>
      <h2>Departments (React Query Example)</h2>
      
      <button 
        onClick={handleCreateDepartment}
        disabled={createDepartment.isPending}
      >
        {createDepartment.isPending ? 'Creating...' : 'Create Department'}
      </button>

      <div>
        <h3>Departments List:</h3>
        {departments?.data?.map((dept) => (
          <div key={dept.id}>
            <strong>{dept.name}</strong> - {dept.description}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactQueryExample; 