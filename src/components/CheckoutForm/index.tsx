import { useState } from "react";

interface CheckoutFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mt-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Información de contacto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium">
              Código Postal
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Completar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
