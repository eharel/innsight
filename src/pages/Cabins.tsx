import { useState } from 'react';
import CabinForm from '../components/CabinForm';
import type { Cabin, CabinFormData } from '../types/cabin';
import styled from 'styled-components';

const StyledCabins = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const CabinTable = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 2.4rem;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: var(--color-grey-100);
  border: none;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const CreateButton = styled(Button)`
  background-color: var(--color-primary);
  color: white;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

// Mock cabin data

const cabinsMockData: Cabin[] = [
  {
    id: 1,
    name: 'Forest Retreat',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    description: 'Cozy cabin for two with forest views.',
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 2,
    name: 'Mountain View',
    maxCapacity: 4,
    regularPrice: 350,
    discount: 25,
    description: 'Spacious cabin with stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    name: 'Lakeside Cabin',
    maxCapacity: 6,
    regularPrice: 500,
    discount: 50,
    description: 'Large cabin by the lake, perfect for families.',
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 4,
    name: 'Luxury Suite',
    maxCapacity: 2,
    regularPrice: 400,
    discount: 0,
    description: 'Premium cabin with luxury amenities.',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
];

function Cabins() {
  const [cabins, setCabins] = useState<Cabin[]>(cabinsMockData);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCabin, setEditingCabin] = useState<Cabin | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this cabin?')) {
      setCabins(cabins.filter(cabin => cabin.id !== id));
    }
  };

  const handleAddCabin = (newCabin: CabinFormData) => {
    // Generate a new ID for the cabin
    const id = Math.max(0, ...cabins.map(cabin => cabin.id)) + 1;
    setCabins([...cabins, { ...newCabin, id } as Cabin]);
    setShowCreateForm(false);
  };

  const handleEditCabin = (updatedCabin: CabinFormData) => {
    setCabins(cabins.map(cabin => 
      cabin.id === updatedCabin.id ? { ...updatedCabin, id: cabin.id } : cabin
    ));
    setEditingCabin(null);
  };

  const startEditing = (cabin: Cabin) => {
    setEditingCabin(cabin);
  };

  return (
    <StyledCabins>
      <Row>
        <div>
          <h1>Cabins</h1>
          <p>Manage hotel cabins and their availability</p>
        </div>
        <CreateButton onClick={() => setShowCreateForm(true)}>
          Add new cabin
        </CreateButton>
      </Row>

      <CabinTable>
        <TableHeader>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </TableHeader>

        {cabins.map(cabin => (
          <CabinRow key={cabin.id}>
            <Img src={cabin.image} alt={cabin.name} />
            <Cabin>{cabin.name}</Cabin>
            <div>Fits up to {cabin.maxCapacity} guests</div>
            <Price>${cabin.regularPrice}</Price>
            {cabin.discount > 0 ? (
              <Discount>${cabin.discount}</Discount>
            ) : (
              <span>—</span>
            )}
            <ButtonGroup>
              <Button onClick={() => startEditing(cabin)}>Edit</Button>
              <Button onClick={() => handleDelete(cabin.id)}>Delete</Button>
            </ButtonGroup>
          </CabinRow>
        ))}
      </CabinTable>

      {/* Modal for creating a new cabin */}
      {showCreateForm && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            width: '800px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ padding: '2rem' }}>
              <h2>Add New Cabin</h2>
            </div>
            <CabinForm 
              onSubmit={handleAddCabin} 
              onCancel={() => setShowCreateForm(false)} 
            />
          </div>
        </div>
      )}

      {/* Modal for editing an existing cabin */}
      {editingCabin && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            width: '800px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ padding: '2rem' }}>
              <h2>Edit Cabin</h2>
            </div>
            <CabinForm 
              cabin={editingCabin}
              onSubmit={handleEditCabin} 
              onCancel={() => setEditingCabin(null)} 
            />
          </div>
        </div>
      )}
    </StyledCabins>
  );
}

export default Cabins;
