import { useForm, SubmitHandler } from "react-hook-form";

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

export default function CheckoutFormRHF({ onSubmit }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitForm: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <div className="mt-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Información de contacto</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre completo
          </label>
          <input
            id="name"
            {...register("name", { required: "Este campo es obligatorio" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Este campo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Dirección
          </label>
          <input
            id="address"
            {...register("address", { required: "Este campo es obligatorio" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              Ciudad
            </label>
            <input
              id="city"
              {...register("city", { required: "Este campo es obligatorio" })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium">
              Código Postal
            </label>
            <input
              id="zipCode"
              {...register("zipCode", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\d{5}$/,
                  message: "Debe ser un código postal de 5 dígitos",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zipCode.message}
              </p>
            )}
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
