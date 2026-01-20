import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate API call
        if (username === 'demo' && password === 'demo') {
            login();
            toast.success('¡Bienvenido de nuevo!');
            navigate('/');
        } else {
            toast.error('Credenciales incorrectas', {
                description: 'Prueba con usuario: demo y contraseña: demo'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <div className="w-full max-w-md space-y-8 animate-fade-in">
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-foreground font-bold text-xl">M</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Multicentros CRM
                    </h1>
                    <p className="text-muted-foreground">
                        Accede a tu panel de distribuidor
                    </p>
                </div>

                <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="username"
                                    placeholder="demo"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="demo"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 text-base">
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-center text-muted-foreground">
                        <p className="font-medium mb-1">Credenciales de prueba:</p>
                        <code className="bg-background px-2 py-1 rounded border mr-2">demo</code>
                        <code className="bg-background px-2 py-1 rounded border">demo</code>
                    </div>
                </div>
            </div>
        </div>
    );
}
