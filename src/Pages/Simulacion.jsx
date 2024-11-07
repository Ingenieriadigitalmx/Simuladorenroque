import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { FaRegCalendar, FaWhatsapp, FaArrowDown } from "react-icons/fa";
import LogoAllianz from "../img/LogoAllianz.png";
import LogoEnroque from "../img/LogoEnroque.png";
import { MdAttachMoney } from "react-icons/md";
import "./../style.css";
// import FormModal from "./Formmodal";

/*VARIABLES EN USO*/
function Simulacion() {
  const [names, setNames] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [digitoMultiplicador, setDigitoMultiplicador] = useState(null);
  const [amount, setAmount] = useState("");
  const [amount2, setAmount2] = useState("");
  const [amount3, setAmount3] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [ahorro1, setAhorro1] = useState("0");
  const [ahorro2, setAhorro2] = useState("0");
  const [ahorro3, setAhorro3] = useState("0");
  const [suggestions, setSuggestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const emailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
  ];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [validationMessage2, setValidationMessage2] = useState("");
  const numeroWhatsApp = "528711222453"; // Número de WhatsApp al que se enviará el mensaje
  const mensaje = `Hola Enroque, Me llamo: ${names} Tengo ${age} años y quisiera ahorrar ${amount} MXN al mes. Mi correo es ${mail} Mí celular es ${phone} Vengo de Simulador.Enroque.mx`;
  const mensaje2 = `Hola Enroque, Me llamo: ${names} Tengo ${age} años y quisiera ahorrar ${amount2} MXN al mes. Mi correo es ${mail} Mí celular es ${phone} Vengo de Simulador.Enroque.mx`;
  const mensaje3 = `Hola Enroque, Me llamo: ${names} Tengo ${age} años y quisiera ahorrar ${amount3} MXN al mes. Mi correo es ${mail} Mí celular es ${phone} Vengo de Simulador.Enroque.mx`;
  const mensaje4 = `Hola Enroque, Me llamo: ${names} Tengo ${age} años y quisiera ahorrar. Mi correo es ${mail} Mí celular es ${phone} Vengo de Simulador.Enroque.mx`;
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje
  )}`;
  const urlWhatsApp2 = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje2
  )}`;
  const urlWhatsApp3 = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje3
  )}`;
  const urlWhatsApp4 = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    mensaje4
  )}`;

  /*--------------- FUNCIONES CORRESPONDIENTES A NOMBRE --------------- */

  /*Funcion para enviar nombre a las variables que lo utilizan*/
  const handleChangename = (e) => {
    const { value } = e.target;
    const nombrecompleto = value;
    setNames(nombrecompleto);
  };
  /*--------------- FIN DE FUNCIONES CORRESPONDIENTES A NOMBRE --------------- */

  /*--------------- FUNCIONES CORRESPONDIENTES A CORREO --------------- */
  const handleChangemail = (e) => {
    const { value } = e.target;
    setMail(value);

    // Mostrar sugerencias solo después de escribir "@"
    if (value.includes("@")) {
      const [, afterAt] = value.split("@");

      if (afterAt) {
        const filteredSuggestions = emailDomains.filter((domain) =>
          domain.startsWith(afterAt)
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions(emailDomains); // Mostrar todas si el usuario solo escribió "@"
      }
    } else {
      setSuggestions([]); // No mostrar sugerencias si no se ha escrito "@"
    }

    // Solo validar si no hay sugerencias activas
    if (emailRegex.test(value) && suggestions.length === 0) {
      setValidationMessage2("");
    } else if (value && suggestions.length === 0) {
      setValidationMessage2("Correo electrónico no válido");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Al hacer clic en la sugerencia, completar el input
    const [beforeAt] = mail.split("@");
    const completedEmail = `${beforeAt}@${suggestion}`;
    setMail(completedEmail);
    setSuggestions([]);

    // Validar después de completar el correo con la sugerencia
    if (emailRegex.test(completedEmail)) {
      setValidationMessage2("");
    } else {
      setValidationMessage2("Correo electrónico no válido");
    }
  };
  /*--------------- FIN DE FUNCIONES CORRESPONDIENTES A CORREO --------------- */

  /*--------------- FUNCIONES CORRESPONDIENTES A TELEFONO --------------- */

  const handleChangephone = (e) => {
    /*VALIDAR QUE SE INGRESE EL NUMERO DE TELEFONO CORRECTO*/
    const { value } = e.target;
    // Validación para asegurar que solo se ingresen números y que la longitud esté entre 0 y 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setError("");
      // Validar si se alcanza el mínimo de 10 dígitos
      if (value.length > 0 && value.length < 10) {
        setError("El número de teléfono debe tener 10 dígitos");
      } else {
        setError("");
      }
    }
  };

  /*--------------- FIN DE FUNCIONES CORRESPONDIENTES A TELEFONO --------------- */

  /*--------------- FUNCIONES CORRESPONDIENTES A EDAD --------------- */
  const handleChangeage = (e) => {
    /*VALIDAR QUE SE MANEJE LA EDAD CORRECTA Y SE ENVIE EL DIGITO MULTIPLICADOR*/
    const { value } = e.target;
    const numericValue = parseInt(value);
    // Validar que el valor sea un número y esté dentro del rango permitido
    if (!isNaN(numericValue)) {
      if (numericValue < 18) {
        setValidationMessage("La edad mínima es 18 años");
        setDigitoMultiplicador(0);
        setAhorro1(0);
        setAhorro2(0);
        setAhorro3(0);
      } else if (numericValue > 55) {
        setValidationMessage("La edad máxima es 55 años");
        setDigitoMultiplicador(0);
        setAhorro1(0);
        setAhorro2(0);
        setAhorro3(0);
      } else {
        setError(null);
        let newDigitoMultiplicador = 0;
        switch (numericValue) {
          case 18:
            newDigitoMultiplicador = 17102.5561282365;
            break;
          case 19:
            newDigitoMultiplicador = 17102.5561282365;
            break;
          case 20:
            newDigitoMultiplicador = 15438.2506893855;
            break;
          case 21:
            newDigitoMultiplicador = 13870.7256244314;
            break;
          case 22:
            newDigitoMultiplicador = 12487.6523276573;
            break;
          case 23:
            newDigitoMultiplicador = 11237.8783624109;
            break;
          case 24:
            newDigitoMultiplicador = 10110.8025886358;
            break;
          case 25:
            newDigitoMultiplicador = 9093.81805750271;
            break;
          case 26:
            newDigitoMultiplicador = 8176.27278090515;
            break;
          case 27:
            newDigitoMultiplicador = 7348.54207293431;
            break;
          case 28:
            newDigitoMultiplicador = 6012;
            break;
          case 29:
            newDigitoMultiplicador = 5321.38600980748;
            break;
          case 30:
            newDigitoMultiplicador = 5928;
            break;
          case 31:
            newDigitoMultiplicador = 4773.9411337649;
            break;
          case 32:
            newDigitoMultiplicador = 4281.38255056812;
            break;
          case 33:
            newDigitoMultiplicador = 3836.56800398985;
            break;
          case 34:
            newDigitoMultiplicador = 3435.73858842182;
            break;
          case 35:
            newDigitoMultiplicador = 3074.61997052987;
            break;
          case 36:
            newDigitoMultiplicador = 2749.35109160355;
            break;
          case 37:
            newDigitoMultiplicador = 2456.44359021823;
            break;
          case 38:
            newDigitoMultiplicador = 2192.74605662844;
            break;
          case 39:
            newDigitoMultiplicador = 1955.33592031929;
            break;
          case 40:
            newDigitoMultiplicador = 1741.86897944494;
            break;
          case 41:
            newDigitoMultiplicador = 1549.79486419774;
            break;
          case 42:
            newDigitoMultiplicador = 1549.79486419774;
            break;
          case 43:
            newDigitoMultiplicador = 1229.01078551132;
            break;
          case 44:
            newDigitoMultiplicador = 1088.81944970007;
            break;
          case 45:
            newDigitoMultiplicador = 962.825709676356;
            break;
          case 46:
            newDigitoMultiplicador = 842.545310055061;
            break;
          case 47:
            newDigitoMultiplicador = 741.145131636777;
            break;
          case 48:
            newDigitoMultiplicador = 650.493345807882;
            break;
          case 49:
            newDigitoMultiplicador = 569.27280673828;
            break;
          case 50:
            newDigitoMultiplicador = 496.54959931001;
            break;
          case 51:
            newDigitoMultiplicador = 426.673330159287;
            break;
          case 52:
            newDigitoMultiplicador = 368.540812734752;
            break;
          case 53:
            newDigitoMultiplicador = 316.756055306082;
            break;
          case 54:
            newDigitoMultiplicador = 270.554743744037;
            break;
          case 55:
            newDigitoMultiplicador = 225.952746998273;
            break;
          default:
            newDigitoMultiplicador = null;
        }
        setDigitoMultiplicador(newDigitoMultiplicador);
        setValidationMessage("");
        recalculateAmount(newDigitoMultiplicador);
      }
      setAge(value);
    } else {
      setAge("");
    }
  };
  const recalculateAmount = (digitoMultiplicador) => {
    // Verifica si hay un valor de digitoMultiplicador y si amount está definido
    if (digitoMultiplicador && amount) {
      // Convertir el valor de amount a número entero
      const amountAsNumber = parseFloat(amount.replace(/[^0-9.-]+/g, ""));

      if (!isNaN(amountAsNumber)) {
        // Calcula los nuevos montos
        const newAmount = amountAsNumber * digitoMultiplicador;
        const formattedAmount = new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 0,
        }).format(Math.round(newAmount));

        const newAmount2 = (amountAsNumber + 500) * digitoMultiplicador;
        const formattedAmount2 = new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 0,
        }).format(Math.round(newAmount2));

        const newAmount3 = (amountAsNumber + 1000) * digitoMultiplicador;
        const formattedAmount3 = new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 0,
        }).format(Math.round(newAmount3));

        // Actualiza los montos de ahorro
        setAhorro1(formattedAmount);
        setAhorro2(formattedAmount2);
        setAhorro3(formattedAmount3);
      } else {
        console.error("El valor del monto no es un número válido.");
      }
    } else {
      console.error(
        "No se puede recalcular el monto, falta el dígito multiplicador o el monto."
      );
    }
  };
  /*--------------- FIN DE FUNCIONES CORRESPONDIENTES A EDAD --------------- */

  /*--------------- FUNCIONES CORRESPONDIENTES A MONTO --------------- */
  const [rawAmount, setRawAmount] = useState(""); // Estado para el valor en bruto

  // const handleChangeamount = (e) => {
  //   const { value } = e.target;

  //   // Almacenar el valor en bruto del input para permitir que el usuario escriba
  //   setRawAmount(value);

  //   // Reemplazar cualquier cosa que no sea un número
  //   const numericValue = parseFloat(value.replace(/[^0-9]/g, ""));

  //   // Validar y actualizar el estado basado en el valor ingresado
  //   if (!isNaN(numericValue)) {
  //     if (numericValue < 1500) {
  //       setError2("El monto mínimo es $1,500 MXN");
  //       setAhorro1(0);
  //       setAhorro2(0);
  //       setAhorro3(0);
  //     } else if (numericValue > 12500) {
  //       setError2("El monto máximo es $12,500 MXN");
  //       setAhorro1(0);
  //       setAhorro2(0);
  //       setAhorro3(0);
  //     } else {
  //       setError2("");

  //       setAmount(numericValue);  // Guardar el valor numérico sin formatear

  //       // Formatear y establecer el monto una vez validado
  //       const formattedAmount = numericValue.toLocaleString("es-MX", {
  //         style: "currency",
  //         currency: "MXN",
  //         minimumFractionDigits: 0,
  //       });
  //       setAmount(formattedAmount); // Estado para el valor formateado

  //       // Calcular y formatear otros montos
  //       setAmount2(
  //         (numericValue + 500).toLocaleString("es-MX", {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         })
  //       );
  //       setAmount3(
  //         (numericValue + 1000).toLocaleString("es-MX", {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         })
  //       );

  //       // Calcular montos con el dígito multiplicador
  //       const amountAsNumber = numericValue * 10 * digitoMultiplicador;
  //       const formattedAhorro1 = Math.round(amountAsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro1(formattedAhorro1);

  //       const amount2AsNumber = (numericValue * 10 + 500) * digitoMultiplicador;
  //       const formattedAhorro2 = Math.round(amount2AsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro2(formattedAhorro2);

  //       const amount3AsNumber =
  //         (numericValue * 10 + 1000) * digitoMultiplicador;
  //       const formattedAhorro3 = Math.round(amount3AsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro3(formattedAhorro3);
  //     }
  //   } else {
  //     setAmount(""); // Restablece el valor formateado si es inválido
  //   }
  // };

  //   const [formattedAmount, setFormattedAmount] = useState(""); // Valor formateado para mostrar

  // const handleChangeamount = (e) => {
  //   const { value } = e.target;

  //   // Reemplazar cualquier cosa que no sea un número
  //   const numericValue = value.replace(/[^0-9]/g, "");

  //   // Almacenar el valor sin formatear del input
  //   setRawAmount(value);

  //   // Si el campo está vacío, resetea los valores pero permite la interacción
  //   if (numericValue === "") {
  //     setFormattedAmount(""); // Limpia el input de monto
  //     setAmount2(""); // Limpia los montos adicionales
  //     setAmount3("");
  //     setAhorro1(0);
  //     setAhorro2(0);
  //     setAhorro3(0);
  //     setError2("");
  //     return; // Sale de la función si no hay valor numérico válido
  //   }

  //   // Convertir el valor a número
  //   const parsedValue = parseFloat(numericValue);

  //   // Validar y actualizar el estado basado en el valor ingresado
  //   if (!isNaN(parsedValue)) {
  //     if (parsedValue < 1500) {
  //       setError2("El monto mínimo es $1,500 MXN");
  //       setAhorro1(0);
  //       setAhorro2(0);
  //       setAhorro3(0);
  //     } else if (parsedValue > 12500) {
  //       setError2("El monto máximo es $12,500 MXN");
  //       setAhorro1(0);
  //       setAhorro2(0);
  //       setAhorro3(0);
  //     } else {
  //       setError2("");

  //       // Formatear el monto validado
  //       const formatted = parsedValue.toLocaleString("es-MX", {
  //         style: "currency",
  //         currency: "MXN",
  //         minimumFractionDigits: 0,
  //       });
  //       setFormattedAmount(formatted); // Usar este estado para mostrar el valor formateado

  //       // Formatear y establecer los montos adicionales
  //       setAmount2(
  //         (parsedValue + 500).toLocaleString("es-MX", {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         })
  //       );
  //       setAmount3(
  //         (parsedValue + 1000).toLocaleString("es-MX", {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         })
  //       );

  //       // Calcular y formatear los montos con el dígito multiplicador
  //       const amountAsNumber = parsedValue * 10 * digitoMultiplicador;
  //       const formattedAhorro1 = Math.round(amountAsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro1(formattedAhorro1);

  //       const amount2AsNumber = (parsedValue * 10 + 500) * digitoMultiplicador;
  //       const formattedAhorro2 = Math.round(amount2AsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro2(formattedAhorro2);

  //       const amount3AsNumber = (parsedValue * 10 + 1000) * digitoMultiplicador;
  //       const formattedAhorro3 = Math.round(amount3AsNumber).toLocaleString(
  //         "es-MX",
  //         {
  //           style: "currency",
  //           currency: "MXN",
  //           minimumFractionDigits: 0,
  //         }
  //       );
  //       setAhorro3(formattedAhorro3);
  //     }
  //   } else {
  //     setFormattedAmount(""); // Restablece el valor si es inválido
  //   }
  // };

  const [formattedAmount, setFormattedAmount] = useState(""); // Valor formateado para mostrar
  const handleChangeamount = (e) => {
    const { value } = e.target;

    // Reemplazar cualquier cosa que no sea un número
    const numericValue = value.replace(/[^0-9]/g, ""); // Extraer solo dígitos

    // Almacenar el valor sin formatear del input
    setRawAmount(numericValue);

    // Si el campo está vacío, resetea los valores
    if (numericValue === "") {
      resetValues(); // Función para resetear los valores
      return; // Sale de la función si no hay valor numérico válido
    }

    // Convertir el valor a número
    const parsedValue = parseFloat(numericValue);

    // Validar y actualizar el estado basado en el valor ingresado
    if (!isNaN(parsedValue)) {
      if (parsedValue < 1500) {
        setError2("El monto mínimo es $1,500 MXN");
        resetSavings();
      } else if (parsedValue > 12500) {
        setError2("El monto máximo es $12,500 MXN");
        resetSavings();
      } else {
        setError2("");

        // Actualizar el monto como string para evitar errores con replace
        setAmount(parsedValue.toString());

        // Formatear y establecer los montos adicionales
        setAmount2(formatCurrency(parsedValue + 500));
        setAmount3(formatCurrency(parsedValue + 1000));

        // Calcular y formatear los montos con el dígito multiplicador
        const amountAsNumber = parsedValue * 10 * digitoMultiplicador;
        setAhorro1(formatCurrency(Math.round(amountAsNumber)));

        const amount2AsNumber = (parsedValue * 10 + 500) * digitoMultiplicador;
        setAhorro2(formatCurrency(Math.round(amount2AsNumber)));

        const amount3AsNumber = (parsedValue * 10 + 1000) * digitoMultiplicador;
        setAhorro3(formatCurrency(Math.round(amount3AsNumber)));
      }
    } else {
      resetValues(); // Resetea los valores si parsedValue no es un número válido
    }
  };

  // Función para formatear el monto a moneda
  const formatCurrency = (value) => {
    return value.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    });
  };

  // Función para resetear los valores
  const resetValues = () => {
    setFormattedAmount(""); // Limpia el input de monto
    setAmount(""); // Resetea el valor de amount a una cadena vacía
    setAmount2(""); // Limpia los montos adicionales
    setAmount3("");
    resetSavings(); // Resetea ahorros
    setError2(""); // Limpia el error
  };

  // Función para resetear los ahorros
  const resetSavings = () => {
    setAhorro1(0);
    setAhorro2(0);
    setAhorro3(0);
  };

  // Evento para formatear el valor cuando el usuario termine de escribir
  const handleBlur = () => {
    if (rawAmount) {
      const parsedValue = parseFloat(rawAmount);

      // Solo formatear si el valor es un número válido
      if (!isNaN(parsedValue)) {
        const formatted = formatCurrency(parsedValue);
        setFormattedAmount(formatted);
      } else {
        setFormattedAmount(""); // Limpia si no es un número válido
      }
    }
  };

  /*--------------- FIN DE FUNCIONES CORRESPONDIENTES A MONTO --------------- */
  useEffect(() => {
    if (digitoMultiplicador && amount) {
      recalculateAmount(digitoMultiplicador);
    }
  }, [digitoMultiplicador, amount]);
  /*--------------- VALIDACIONES GENERALES DEL FORMULARIO --------------- */
  useEffect(() => {
    if (names && mail && phone.length === 10 && isChecked) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [names, mail, phone, isChecked]);
  /*--------------- FIN DE  VALIDACIONES GENERALES DEL FORMULARIO --------------- */

  /* FUNCION PARA FORMATEAR DATOS CON COMILLA */
  const formatNumbercomillas = (num) => {
    // Asegurarse de que num sea un string
    const cleanedNumber = String(num).replace(/[^0-9.]/g, "");
    const [integerPart, decimalPart] = cleanedNumber.split(".");
    const reversedDigits = integerPart.split("").reverse();
    let formattedNumber = "";

    for (let i = 0; i < reversedDigits.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedNumber += (i / 3) % 2 === 0 ? "'" : ",";
      }
      formattedNumber += reversedDigits[i];
    }

    formattedNumber = formattedNumber.split("").reverse().join("");

    if (decimalPart !== undefined) {
      formattedNumber += "." + decimalPart;
    }

    return formattedNumber;
  };

  /* FIN DE FUNCION PARA FORMATEAR DATOS CON COMILLA */

  /*ENVIO DE DATOS*/

  // Función que deseas ejecutar cuando se acepte el checkbox

  const handleSubmit = async (e) => {
    const data = {
      names,
      mail,
      phone,
      "data": [
        {
            "event_name": "Purchase",
            "event_time": 1730231216,
            "action_source": "website",
            "user_data": {
                "em": [
                    "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
                ],
                "ph": [
                    null
                ]
            },
            "custom_data": {
                "currency": "USD",
                "value": "142.52"
            },
            "original_event_data": {
                "event_name": "Purchase",
                "event_time": 1730231216
            }
        }
    ]
    };

    try {
      // Asegúrate de usar la URL correcta y la clave API de HighLevel
      const response = await axios.post(
        "https://services.leadconnectorhq.com/hooks/o1VPRCKWi8D61HO4dhor/webhook-trigger/be60392e-a218-4d5a-bedf-25258212e64e",
        data,
        {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Im8xVlBSQ0tXaThENjFITzRkaG9yIiwiY29tcGFueV9pZCI6IjlIRmp1SmN5WE9qcExBRWlCdzBzIiwidmVyc2lvbiI6MSwiaWF0IjoxNjk0NjUzNDIyMzQ4LCJzdWIiOiJ1c2VyX2lkIn0.l517JBKvC5AopPnrzh-ycfrNSSTiBZnAYTaShM7BsAM`, // Tu API Key
            "Content-Type": "application/json",
            
          },
          
        }
      );
      
      console.log("Datos enviados:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  // Función que deseas ejecutar cuando se acepte el checkbox
  const handleAccept = () => {
    console.log("Checkbox aceptado");
    handleSubmit(); // Llamamos a handleSubmit al aceptar el checkbox
  };

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      handleAccept(); // Ejecutamos la función cuando se marca el checkbox
    }
  };
  /*FIN DE ENVIO DE DATOS*/
  return (
    <div className="Simulation-container">
      <div className="navbar">
        <div className="alineacion">
          {" "}
          <a
            className="logoallianz"
            rel="noreferrer"
            target="_blank"
            href="https://enroque.mx/"
          >
            <img alt="Allianz" className="LogoAllianz" src={LogoAllianz} />
          </a>
        </div>
        <div className="alineacion-2">
          <Button
            href="https://link.superleads.mx/widget/booking/vlea8K9RxA9YmiqHcGEp"
            className="Agendar-cita btns-personalized"
            target="_blank"
          >
            Agendar cita
            <FaRegCalendar className="ml-2 h-5 w-5" />
          </Button>
          <Button
            className="Agendar-cita btns-personalized"
            target="_blank"
            href={urlWhatsApp}
          >
            Contacto
            <FaWhatsapp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="navleft">
          <div className="contenido">
            <h3 className="subtext sjnkdfjn">
              <strong className="aditional-class ctmxz">
                Simulador de plan personal para retiro
              </strong>
            </h3>
            <form className="formulario flex max-w-md flex-col gap-4">
              <div className="item-formulario nombre">
                <div className="w-full max-w-md">
                  <Label htmlFor="names" value="Nombre completo" />
                </div>
                <TextInput
                  id="names"
                  type="text"
                  placeholder="Escribe tú nombre"
                  value={names}
                  onChange={handleChangename}
                  required={true}
                />
              </div>

              <div className="w-full max-w-md">
                <label htmlFor="mail">Correo</label>
              </div>
              <input
                id="mail"
                type="email"
                placeholder="Correo@gmail.com"
                onChange={handleChangemail}
                value={mail}
                required={true}
                className={
                  validationMessage2 ? "input-failure" : "input-normal"
                }
              />
              {validationMessage2 && (
                <span className="text-red-600">{validationMessage2}</span>
              )}

              {/* Mostrar sugerencias solo si hay alguna */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-item"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}

              <div className="item-formulario celular">
                <div className="block">
                  <Label htmlFor="small" value="Celular" />
                </div>

                <TextInput
                  sizing="sm"
                  id="phone"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Ingresa tú número de celular"
                  value={phone}
                  onChange={handleChangephone}
                  required={true}
                  color={error ? "failure" : "gray"}
                  helperText={
                    error && <span className="text-red-600">{error}</span>
                  }
                />
              </div>

              <div className="label-chechboxs">
                <label className="labelcustom">
                  <input
                    className="formulariocheckbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  Acepto el{" "}
                  <a
                    href="/Advice.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Aviso de privacidad
                  </a>
                </label>
              </div>
              <div className="item-formulario edad">
                <div className="w-full max-w-md">
                  <Label htmlFor="age" value="Edad" />
                  <TextInput
                    id="age"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    type="number"
                    placeholder="Ingresa tú edad (de 18 a 55 años)"
                    value={age}
                    onChange={handleChangeage}
                    required={true}
                    color={validationMessage ? "failure" : "gray"}
                    helperText={
                      validationMessage && (
                        <span className="text-red-600">
                          {validationMessage}
                        </span>
                      )
                    }
                    disabled={!isFormComplete}
                    className={`${
                      !isFormComplete
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed whitoutpadding"
                        : "bg-white whitoutpadding"
                    }`}
                  />
                </div>
              </div>
              <div className="item-formulario ahorro">
                <div className="w-full max-w-md">
                  <Label
                    htmlFor="amount"
                    value="¿Cuánto quieres ahorrar al mes?"
                  />
                  <TextInput
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Desde $1,500 MXN hasta $12,500 MXN"
                    value={rawAmount}
                    onChange={handleChangeamount}
                    onBlur={handleBlur} // Formatear cuando el input pierde el foco
                    onFocus={() => setFormattedAmount(rawAmount)} // Volver al valor sin formatear al hacer foco
                    required={true}
                    color={error2 ? "failure" : "gray"}
                    helperText={
                      error2 && <span className="text-red-600">{error2}</span>
                    }
                    disabled={!isFormComplete}
                    className={`${
                      !isFormComplete
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed whitoutpadding"
                        : "bg-white whitoutpadding"
                    }`}
                  />
                </div>
              </div>
              <br />
            </form>
          </div>
          <a
            href="https://enroque.mx"
            rel="noreferrer"
            target="_blank"
            className="logo-btm2"
          >
            <div className="btm-left">
              <img className="logoenroque" src={LogoEnroque} alt="Enroque.mx" />
            </div>{" "}
          </a>
        </div>
        <div className="navright">
          <div className="content-right">
            <div className="one">
              <div className="widthsk">
                <h3 className="subtext sjnkdfjn">
                  <strong className="aditional-class">
                    Simulador de plan personal para retiro
                  </strong>
                </h3>
                <h3 className="hi-name">Hola, {names}</h3>
                <h3 className="subtext">
                  Ve lo que tendrás ahorrado a los <strong>65 años:</strong>
                </h3>
              </div>
              <div className="three-items">
                {/* <div></div>
                <div></div>
                 <Button className="btn">65 años</Button><Button className="btn">70 años</Button>
                <Button className="btn">75 años</Button> */}
              </div>
            </div>
            <div className="two">
              <div className="baja yellow">
                <div className="title yellow">
                  <h4>Baja</h4>
                </div>
                <h6 className="apr-title">Aportación mensual</h6>
                <p className="dinero"> {amount} MXN</p>
                <FaArrowDown className="ml-2 h-5 w-5 margin-icon" />
                <h6 className="apr-title">Ahorro Proyectado</h6>
                <p className="dinero-2">
                  $ {formatNumbercomillas(ahorro1)} MXN
                </p>
                <p className="monto3">
                  *Simulación estimada, podría ser mayor o menor.*
                </p>
                <Button
                  className="btn-green"
                  target="_blank"
                  href={urlWhatsApp}
                >
                  CONTRATAR
                  <FaWhatsapp className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="baja blue">
                <div className="title blue">
                  <h4>Media</h4>
                </div>
                <h6 className="apr-title">Aportación mensual</h6>
                <p className="dinero"> {amount2} MXN</p>
                <FaArrowDown className="ml-2 h-5 w-5 margin-icon" />
                <h6 className="apr-title">Ahorro Proyectado</h6>
                <p className="dinero-2-3">
                  $ {formatNumbercomillas(ahorro2)} MXN
                </p>
                <p className="monto3">
                  *Simulación estimada, podría ser mayor o menor.*
                </p>
                <Button
                  className="btn-green"
                  target="_blank"
                  href={urlWhatsApp2}
                >
                  CONTRATAR
                  <FaWhatsapp className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="baja green">
                <div className="title green">
                  <h4>Alta</h4>
                </div>
                <h6 className="apr-title">Aportación mensual</h6>
                <p className="dinero"> {amount3} MXN</p>
                <FaArrowDown className="ml-2 h-5 w-5 margin-icon" />
                <h6 className="apr-title">Ahorro Proyectado</h6>
                <p className="dinero-2-3-4">
                  $ {formatNumbercomillas(ahorro3)} MXN
                </p>
                <p className="monto3">
                  *Simulación estimada, podría ser mayor o menor.*
                </p>
                <Button
                  className="btn-green"
                  target="_blank"
                  href={urlWhatsApp3}
                >
                  CONTRATAR
                  <FaWhatsapp className="ml-2 h-5 w-5" />
                </Button>
              </div>{" "}
            </div>
            <div className="three">
              <p>
                El día que recibas el dinero vas agradecerte a tí mismo por
                haber iniciado hoy, te lo garantizamos.
              </p>
            </div>
            <div className="four">
              <Button
                className="blue-btn"
                target="_blank"
                href="https://link.superleads.mx/widget/booking/vlea8K9RxA9YmiqHcGEp"
              >
                AGENDA LLAMADA DE ESTRATEGIA
                <MdAttachMoney className="ml-2 h-5 w-5" />
              </Button>

              <Button href={urlWhatsApp4} target="_blank" className="green-btn">
                CONTACTO
                <FaWhatsapp className="ml-2 h-5 w-5" />
              </Button>
            </div>{" "}
            <p className="monto3">
              <a href="https://ingenieriadigital.mx">
                {" "}
                Simulador elaborado por Ingeniería Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Simulacion;
