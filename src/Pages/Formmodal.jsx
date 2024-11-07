import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";

const FormModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    phone: "",
    age: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      const amount = storedFormData.amount ? parseFloat(storedFormData.amount) : "";
      const age = storedFormData.age || "";

      setFormData({
        fullName: storedFormData.fullName || "",
        birthDate: storedFormData.birthDate || "",
        email: storedFormData.email || "",
        phone: storedFormData.phone || "",
        age: age,
        amount: !isNaN(amount) ? amount.toString() : "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Calcular la edad basada en la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;
    const age = calculateAge(value);

    if (age >= 19 && age <= 55) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        age: age.toString(),
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        age: "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "La edad debe estar entre 19 y 55 años.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "El nombre es obligatorio.";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    }

    if (!formData.age || formData.age < 19 || formData.age > 55) {
      newErrors.age = "La edad debe estar entre 19 y 55 años.";
    }

    if (!formData.amount || parseFloat(formData.amount) < 1500 || parseFloat(formData.amount) > 12500) {
      newErrors.amount = "El ahorro estimado debe estar entre 1500 y 12500.";
    }

    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = "El número de celular debe tener 10 dígitos.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Guardar en localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      setIsOpen(false); // Solo cerrar si los datos son válidos
    }
  };

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 19, today.getMonth(), today.getDate()).toISOString().split("T")[0];
  const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate()).toISOString().split("T")[0];

  return (
    <Modal
      className="modal-container"
      show={isOpen}
      onClose={() => setIsOpen(false)} // No cerrar con el clic fuera del modal
      dismissible={false}
    >
      <Modal.Body className="body-modal">
        <div className="title-content-modal">
          <div className="tit-top">
            <h3 className="title-li-bl">Un paso más</h3>
            <div className="line-petit"></div>
          </div>
          <h3 className="comple-form">Datos de contacto</h3>
          <p className="text-gray">
            ¿Quieres vivir <strong> tu retiro sin preocupación?</strong>
            <br />
            Asegura tu retiro y disfruta de tu jubilación con tranquilidad
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 items-form">
          <div>
            <Label htmlFor="fullName" value="Nombre y Apellido" />
            <TextInput
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="birthDate" value="Fecha de Nacimiento" />
            <TextInput
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleBirthDateChange}
              min={minDate}
              max={maxDate}
              required
            />
            {errors.birthDate && <p className="text-red-500">{errors.birthDate}</p>}
          </div>
          <div>
            <Label htmlFor="email" value="Correo Electrónico" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone" value="Celular" />
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="age" value="Edad" />
            <TextInput
              id="age"
              name="age"
              type="number"
              value={formData.age || ""}
              readOnly
              required
            />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <div>
            <Label htmlFor="amount" value="Ahorro Estimado de Dinero" />
            <TextInput
              id="amount"
              name="amount"
              type="number"
              value={formData.amount || ""}
              onChange={handleChange}
              required
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
