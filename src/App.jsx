// src/App.jsx
import { useSesionExpiradaCheck } from './utils/SesionExpiradaProvider'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout.jsx'

import SolicitudCiudadanaExterna from './pages/oirs/solicitud-ciudadana-externa/index.jsx'
import SolicitudCiudadanaFuncionario from './pages/oirs/solicitud-ciudadana-funcionario/index.jsx'
import Oirs from './pages/Inicio.jsx'
import DatosBasicos from './pages/oirs/solicitud-ciudadana-externa/DatosBasicos.jsx'
import DatosCausa from './pages/oirs/solicitud-ciudadana-externa/DatosCausa.jsx'
import Encuesta from './pages/oirs/solicitud-ciudadana-externa/Encuesta.jsx'
import Inicio from './pages/Inicio.jsx'

function App() {
	useSesionExpiradaCheck()

	return (
		<>
			<Routes>
				<Route path="/" element={<Inicio />} />
				<Route path="/oirs" element={<DefaultLayout />}>
					<Route index element={<Oirs />} />
					<Route
						path="solicitud-ciudadana-externa"
						element={<SolicitudCiudadanaExterna />}
					>
						<Route path="datos-basicos" element={<DatosBasicos />} />
						<Route path="datos-causa" element={<DatosCausa />} />
						<Route path="encuesta" element={<Encuesta />} />
					</Route>
					<Route
						path="solicitud-ciudadana-funcionario"
						element={<SolicitudCiudadanaFuncionario />}
					>
						<Route path="ingreso-solicitud-interno" element={<DatosBasicos />} />
						<Route path="solicitudes-pendientes" element={<DatosCausa />} />
					</Route>
				</Route>
			</Routes>
		</>
	)
}

export default App
