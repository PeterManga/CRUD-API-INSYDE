import './login.css';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'; // Importa el hook useForm

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(); // Inicializa el hook useForm

    const { signin, isAuthenticated, errors: signinErrors } = useAuth();

    const onSubmit = async (data) => {
        try {
            await signin(data); // Espera la respuesta de la función signin
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container-fluid mt-5 '>
            <div className='w-75 p-3 container shadow-lg p-3 mb-5 bg-white rounded login'>
                <div className="d-flex flex-column  align-items-center justify-content-center p-3 shadow position-relative overflow-hidden " style={{ backgroundColor: '#fff' }}>
                    <div className="position-absolute" style={{ content: '', width: '300px', height: '310px', backgroundColor: 'rgb(20, 124, 6)', transform: 'rotate(45deg)', left: '-180px', bottom: '30px', zIndex: '1', borderRadius: '30px', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.082)' }}></div>
                    <h1 className="font-weight-bold display-1 text-success" style={{ zIndex: '2' }}>Login</h1>
                    <div className='container '>
                        {signinErrors.length > 0 && signinErrors.map((error, i) => (
                            <div key={i} className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ))}
                        <Form className="position-relative d-flex flex-column  align-items-center justify-content-center gap-5" style={{ zIndex: '2', height: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="w-50 mb-2 position-relative" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" className="border-0" style={{ backgroundColor: 'transparent', borderBottom: '2px solid rgb(173, 173, 173)', color: 'black', fontSize: '.8em', fontWeight: '500', paddingLeft: '30px' }} {...register("email", { required: "Email is required" })} />
                                {errors.email && <span>{errors.email.message}</span>}
                            </Form.Group>
                            <Form.Group className="w-50 mb-2 position-relative" controlId="formPassword">
                                <Form.Control type="password" placeholder="Enter your password" className="border-0" style={{ backgroundColor: 'transparent', borderBottom: '2px solid rgb(173, 173, 173)', color: 'black', fontSize: '.8em', fontWeight: '500', paddingLeft: '30px' }} {...register("password", { required: "Password is required" })} />
                                {errors.password && <span>{errors.password.message}</span>}
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-50 position-relative" style={{ zIndex: '2', height: '60px', color: 'white', fontSize: '.8em', fontWeight: '500', letterSpacing: '1px', margin: '10px', cursor: 'pointer', backgroundColor: 'rgb(55, 199, 55)' }}>
                                Entrar
                            </Button>
                        </Form>
                    </div>
                    <a href="#" className="font-weight-bold" style={{ fontSize: '.7em', color: 'rgb(44, 24, 128)', textDecoration: 'none', padding: '8px 15px', borderRadius: '20px', zIndex: '2' }}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}
