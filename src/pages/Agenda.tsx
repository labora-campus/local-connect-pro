import { useState } from 'react';
import { mockEvents } from '@/data/mockAgendaData';
import { CalendarEvent } from '@/types/crm';
import { format, isSameDay, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Phone, Users, CheckCircle2, Circle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Agenda() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // New Task Form State
    const [newTask, setNewTask] = useState({
        title: '',
        type: 'task',
        description: '',
        time: '12:00'
    });

    const todaysEvents = events.filter(event => isSameDay(event.start, selectedDate));

    // Sort events by time
    todaysEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

    const handleCreateTask = () => {
        const [hours, minutes] = newTask.time.split(':').map(Number);
        const eventDate = new Date(selectedDate);
        eventDate.setHours(hours, minutes);

        const newEvent: CalendarEvent = {
            id: Math.random().toString(36).substr(2, 9),
            title: newTask.title,
            description: newTask.description,
            start: eventDate,
            type: newTask.type as any,
            isCentral: false,
            completed: false
        };

        setEvents([...events, newEvent]);
        setIsDialogOpen(false);
        setNewTask({ title: '', type: 'task', description: '', time: '12:00' });
    };

    const toggleTask = (id: string) => {
        setEvents(events.map(e => {
            if (e.id === id && !e.isCentral) {
                return { ...e, completed: !e.completed };
            }
            return e;
        }));
    };

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'central': return <Calendar className="w-5 h-5 text-purple-600" />;
            case 'call': return <Phone className="w-5 h-5 text-blue-600" />;
            case 'meeting': return <Users className="w-5 h-5 text-green-600" />;
            default: return <CheckCircle2 className="w-5 h-5 text-gray-600" />;
        }
    };

    return (
        <div className="space-y-6 pb-20 lg:pb-0 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Agenda</h1>
                    <p className="text-muted-foreground">
                        {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                    </p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Nueva Tarea
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Añadir Tarea</DialogTitle>
                            <DialogDescription>
                                Agenda una nueva acción comercial.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    placeholder="Ej. Llamar a Cliente X"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Hora</Label>
                                    <Input
                                        type="time"
                                        value={newTask.time}
                                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo</Label>
                                    <Select
                                        value={newTask.type}
                                        onValueChange={(val) => setNewTask({ ...newTask, type: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="task">Tarea</SelectItem>
                                            <SelectItem value="call">Llamada</SelectItem>
                                            <SelectItem value="meeting">Reunión</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Notas</Label>
                                <Textarea
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    placeholder="Detalles adicionales..."
                                />
                            </div>
                            <Button onClick={handleCreateTask} className="w-full">Guardar</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-4">
                {todaysEvents.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                        No hay eventos programados para hoy.
                    </div>
                ) : (
                    todaysEvents.map((event) => (
                        <Card key={event.id} className={`${event.isCentral ? 'border-l-4 border-l-purple-500 bg-purple-50/50' : ''}`}>
                            <CardContent className="p-4 flex items-start gap-4">
                                <div className="mt-1">
                                    {getEventIcon(event.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`font-semibold ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                {event.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {format(event.start, 'HH:mm')}
                                                {event.end && ` - ${format(event.end, 'HH:mm')}`}
                                            </p>
                                        </div>
                                        {event.isCentral && (
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                                                Central
                                            </Badge>
                                        )}
                                    </div>
                                    {event.description && (
                                        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                                    )}
                                </div>

                                {!event.isCentral && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => toggleTask(event.id)}
                                        className={event.completed ? 'text-green-600' : 'text-gray-400'}
                                    >
                                        {event.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
