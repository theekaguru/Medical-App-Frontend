import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Error from "../pages/Error";
import { Contact } from "../pages/Contact";
import { About } from "../pages/About";
import { Register } from "../pages/auth/Register";
import { Login } from "../pages/auth/Login";
import EmailVerification from "../pages/auth/EmailVerification";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { AppLayout } from "../components/layout/AppLayout";
import { AdminDashboard } from "../pages/dashboard/AdminDashboard";
import { UserDashboard } from "../pages/dashboard/UserDashboard";
import { DoctorDashboard } from "../pages/dashboard/DoctorDashboard";
import { AppointmentList } from "../pages/appointments/AppointmentList";
import { UserList } from "../pages/users/UserList";
import { DoctorTabs } from "../pages/doctors/DoctorTabs";
import { ComplaintsList } from "../pages/complaints/ComplaintsList";
import { PrescriptionList } from "../pages/prescriptions/PrescriptionList";
import { SpecializationList } from "../pages/specializations/SpecializationList";
import { DoctorAvailabilityList } from "../pages/doctorsAvailability/DoctorAvailabilityList";
import { PaymentsList } from "../pages/payments/PaymentsList";
import { Profile } from "../pages/settings/Profile";
import { ForgotPassword } from "../pages/auth/ForgotPassword";
import { ResetPassword } from "../pages/auth/ResetPassword";
import { AllDoctors } from "../pages/doctors/AllDoctors";
import { PatientAppointment } from "../pages/appointments/PatientAppointment";
import ComplaintChat from "../pages/complaints/ComplaintChat";
import { MedicalHistory } from "../pages/medicalHistory/MedicalHistory";
import { PatientList } from "../pages/patients/PatientList";
import { PaymentCancelled } from "../pages/payments/PaymentCancelled";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <Error />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
    errorElement: <Error />,
  },
  {
    path: "/browse-doctors",
    element: <AllDoctors />,
    errorElement: <Error />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
    errorElement: <Error />,
  },
  {
    path: "all-doctors",
    element: <AllDoctors />,
    errorElement: <Error />
  },
  {
    path: "payment-cancelled",
    element: <PaymentCancelled />
  },

  // Admin Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "appointments",
        element: <AppointmentList />,
      },
      {
        path: "users",
        element: <UserList />
      },
      {
        path: "Doctors",        
        element: <DoctorTabs /> 
      },
      {
        path: "complaints",
        element: <ComplaintsList />
      },
      {
        path: "prescriptions",
        element: <PrescriptionList />
      },
      {
        path: "specializations",
        element: <SpecializationList />
      },
      {
        path: "doctor-availability",
        element: <DoctorAvailabilityList />
      },
      {
        path: "payments",
        element: <PaymentsList />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "complaints/:complaintId",   // ⬅️ Add this line
        element: <ComplaintChat />,
      },
    ],
  },

  // User Dashboard
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "appointments",
        element: <PatientAppointment />,
      },
      {
        path: "complaints",
        element: <ComplaintsList />
      },
      {
        path: "prescriptions",
        element: <PrescriptionList />
      },
      {
        path: "browse-doctors",
        element: <AllDoctors />
      },
      {
        path: "payments",
        element: <PaymentsList />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "complaints/:complaintId",
        element: <ComplaintChat />,
      },
      {
        path:"medical-history",
        element: <MedicalHistory />
      },
    ],
  },

  // Doctor Dashboard
  {
    path: "/doctor-dashboard",
    element: (
      <ProtectedRoute allowedRoles={['doctor']}>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DoctorDashboard />,
      },
      {
        path: "appointments",
        element: <AppointmentList />,
      },
      {
        path: "prescriptions",
        element: <PrescriptionList />
      },
      {
        path: "payments",
        element: <PaymentsList />
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "patients",
        element: <PatientList />
      }
    ],
  },
]);
