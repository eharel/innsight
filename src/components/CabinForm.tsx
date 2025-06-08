import { useState } from 'react';
import type { CabinFormData } from '../types/cabin';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 8px;
  padding: 2.4rem 4rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  &:has(textarea) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const Textarea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  height: 8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  margin-top: 1.6rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 1.2rem 2.4rem;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s;
`;

const CancelButton = styled(Button)`
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const SubmitButton = styled(Button)`
  background-color: var(--color-primary);
  color: white;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

interface CabinFormProps {
  cabin?: CabinFormData;
  onSubmit: (cabin: CabinFormData) => void;
  onCancel: () => void;
}

const defaultCabin: CabinFormData = {
  name: '',
  maxCapacity: 1,
  regularPrice: 0,
  discount: 0,
  description: '',
  image: '',
};

function CabinForm({ cabin = defaultCabin, onSubmit, onCancel }: CabinFormProps) {
  const [formData, setFormData] = useState<CabinFormData>(cabin);
  const isEditSession = Boolean(cabin.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxCapacity' || name === 'regularPrice' || name === 'discount' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">Cabin name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="maxCapacity">Maximum capacity</Label>
            <Input
              type="number"
              id="maxCapacity"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              min="1"
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="regularPrice">Regular price</Label>
            <Input
              type="number"
              id="regularPrice"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              min="0"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="discount">Discount</Label>
            <Input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="image">Image URL</Label>
            <Input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">
            {isEditSession ? 'Edit cabin' : 'Add cabin'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
}

export default CabinForm;
