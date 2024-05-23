import React, { useState, useEffect } from 'react';
import EventForm from './eventForm/EventForm';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { createEvent, getCalendars } from '../../services/apiCalls';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import dayjs from 'dayjs'
import "dayjs/locale/es"
import { useParams } from 'react-router-dom';
// Mostramos la información en español
dayjs.locale("es")
const localizer = dayjsLocalizer(dayjs)


// Personalizar los botones para que aparezcan en español
const messagesES = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Sin eventos"
};


export const CalendarPage = (props) => {

    // Obtener el parámetro 'id' de los parámetros de la URL usando useParams
    const { id } = useParams();
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [events, setEvents] = useState([]);
    const playerId = id;
    const [loading, setLoading] = useState(false);

    //hook ussEffect
    useEffect(() => {
        if ((!loading && events.length === 0) || (loading == true)) {
            getCalendars()
                .then(result => {
                    // Mapear los eventos a la estructura requerida por react-big-calendar
                    const formattedEvents = result.map(event => ({
                        start: new Date(event.fechaInicio),
                        end: new Date(event.fechaFin),
                        title: event.nombre,
                        data: {
                            playlist: event.playlist
                        }
                    }));
                    setEvents(formattedEvents);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => setLoading(false));
        }
        console.log(events)

    }, [loading, events]);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        console.log(slotInfo)
        setShowEventForm(true);
    };

    // Manejar el cierre del formulario de eventos
    const handleEventFormClose = () => {
        setShowEventForm(false);
    };

    // Manejar el envío del formulario de eventos
    const handleEventFormSubmit = async (formData) => {
        const newEvent = {
            ...formData

        };
        console.log(newEvent)

        try {
            //Crear un nuevo evento en el servidor
            const updatedPlayer = await createEvent(playerId, newEvent);
            setLoading(true);
        } catch (error) {
            console.error('Error creando el evento:', error);
        } finally {
            setShowEventForm(false); // Cierra el formulario de eventos
        }
    };



    return (
        <div className='container' >
            {/* Indicamos el localizador */}

            <Calendar
                localizer={localizer}
                messages={messagesES}
                events={events} //Pasar los eventos al componente de calendario
                views={["month", "week", "day"]}
                defaultView='week'
                selectable
                onSelectSlot={handleSelectSlot}  // Manejar la selección de un rango de tiempo
            />
            <EventForm
                show={showEventForm} // Mostrar u ocultar el formulario de eventos
                handleClose={handleEventFormClose}  // Manejar el cierre del formulario
                handleFormSubmit={handleEventFormSubmit} // Manejar el envío del formulario
            />
        </div >
    )
}