import React, { useState, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import millonescubiertos from "../img/100Millones.png";
import allianz from "../img/Allianz.png";
import enroque from "../img/Enroque.png";
import logo from "../img/AllianzDistribuidor.png";
import "./../style.css";

function Home() {
  const [formData, setFormData] = useState({
    birthDate: "",
    age: "",
    amount: "",
  });

  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [error2, setError2] = useState("");
  const [age, setAge] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    birthDate: "",
    amount: "",
  });

  // Guardar formData en localStorage cada vez que formData cambie
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Guardar amount en localStorage cada vez que amount cambie
  useEffect(() => {
    // Convertir amount a número antes de almacenarlo
    const numericAmount = parseFloat(amount.replace(/[^0-9]/g, ""));
    localStorage.setItem(
      "amount",
      isNaN(numericAmount) ? "" : numericAmount.toString()
    );
  }, [amount]);

  // Guardar age en localStorage cada vez que age cambie
  useEffect(() => {
    localStorage.setItem("age", age);
  }, [age]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convierte `value` a un número solo para el campo `amount`
    if (name === "amount") {
      const numericValue = parseFloat(value.replace(/[^0-9]/g, ""));
      setAmount(
        isNaN(numericValue)
          ? ""
          : numericValue.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
              minimumFractionDigits: 0,
            })
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isNaN(numericValue) ? "" : numericValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleChange2 = (e) => {
    const { value } = e.target;
    const numericValue = parseFloat(value.replace(/[^0-9]/g, ""));

    if (!isNaN(numericValue)) {
      if (numericValue < 1500) {
        setError2("El monto mínimo es $1,500 MXN");
      } else if (numericValue > 12500) {
        setError2("El monto máximo es $12,500 MXN");
      } else {
        setError2("");
      }

      // Almacenar el valor numérico en localStorage
      localStorage.setItem("amount", numericValue.toString());

      // Formatear valor como moneda MXN para la visualización
      setAmount(
        numericValue.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 0,
        })
      );
    } else {
      setAmount("");
      localStorage.setItem("amount", "");
    }
  };

  const handleAgeChange = (e) => {
    const { value } = e.target;
    const numericValue = parseInt(value, 10);

    // Validar que el valor sea un número y esté dentro del rango permitido
    if (!isNaN(numericValue)) {
      if (numericValue < 19) {
        setValidationMessage("La edad mínima es 19 años");
      } else if (numericValue > 55) {
        setValidationMessage("La edad máxima es 55 años");
      } else {
        setValidationMessage("");
      }
      setAge(value);
    } else {
      setAge("");
    }
  };

  // Obtener la fecha máxima permitida (19 años atrás)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 19);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;

    // Calcular edad a partir de la fecha de nacimiento
    const calculatedAge = calculateAge(value);
    setAge(calculatedAge);

    // Validar que la fecha ingresada no sea mayor a la fecha máxima permitida
    if (new Date(value) > maxDate) {
      setError("Debes tener al menos 19 años.");
    } else {
      setError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Actualizar formData con los valores de amount, y age
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: parseFloat(amount.replace(/[^0-9]/g, "")), // Guardar solo el valor numérico
      age,
    }));
  }, [amount, age]);

  const validateForm = () => {
    const errors = {};

    if (!formData.birthDate) {
      errors.birthDate = "La fecha de nacimiento es obligatoria";
    }
    if (!amount || error2) {
      errors.amount =
        "La cantidad es obligatoria y debe estar en el rango permitido";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Aquí puedes manejar el envío del formulario
      console.log("Formulario enviado", formData);
    }
  };

  return (
    <div className="container-home">
      <div className="container-white">
        <a href="https://enroque.mx">
          <img
            className="logo-up"
            src={logo}
            alt="Allianz distribuidor autorizado"
          />
        </a>
      </div>
      <div className="container-inside">
        <div className="left boot-containers">
          <div className="cotiza-line">
            <h4>Cotiza aquí tu </h4>
            <div className="line-widrh"></div>
          </div>
          <h1 className="title-retiro">
            Retiro sin <strong>preocupaciones</strong>
          </h1>
          <h2 className="subtitle-ret">
            No esperes más y disfruta de la vida como siempre soñaste con
            nuestro seguro de retiro Allianz.{" "}
            <strong>¡Cotiza ahora tu plan de retiro personal!</strong>
          </h2>
          <button className="btn-green-home">
            Agendar llamada de estrategia
          </button>
          <img
            className="millonescubiertos"
            src={millonescubiertos}
            alt="100 millones de clientes cubiertos"
          />
          <img className="allianzpeople" src={allianz} alt="Allianz" />
        </div>
        <div className="right boot-containers">
          {" "}
          <form
            className="formulario flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <a href="https://enroque.mx">
              <img className="img-enr" src={enroque} alt="Enroque" />
            </a>
            <div className="item-formulario">
              <Label htmlFor="birthDate" value="Fecha de Nacimiento" />
              <TextInput
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleBirthDateChange}
                required
                max={maxDateString} // Establecer el valor máximo permitido
                color={formErrors.birthDate ? "failure" : "gray"}
                helperText={
                  formErrors.birthDate && (
                    <span className="text-red-600">{formErrors.birthDate}</span>
                  )
                }
              />
            </div>

            <div className="item-formulario">
              <div className="w-full max-w-md">
                <Label
                  htmlFor="amount"
                  value="¿Cuánto quieres ahorrar al mes?"
                />
                <TextInput
                  id="amount"
                  type="text"
                  placeholder="Cantidad"
                  value={amount}
                  onChange={handleChange2}
                  required={true}
                  color={formErrors.amount ? "failure" : "gray"}
                  helperText={
                    formErrors.amount && (
                      <span className="text-red-600">{formErrors.amount}</span>
                    )
                  }
                />
              </div>
            </div>
            <div className="item-formulario">
              <div className="w-full max-w-md">
                <Label htmlFor="age" value="¿Cuántos años tienes?" />
                <TextInput
                  id="age"
                  type="number"
                  placeholder="Edad"
                  value={age}
                  disabled // Hacer el campo inhabilitado
                  color={validationMessage ? "failure" : "gray"}
                  helperText={
                    validationMessage && (
                      <span className="text-red-600">{validationMessage}</span>
                    )
                  }
                />
              </div>
            </div>
            <Button href="/simulador" type="submit" className="btn-greeeeen">
              GENERAR PROYECCIÓN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
