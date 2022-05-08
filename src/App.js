import React, { Suspense } from "react";
import Header from "./components/header";
import "./App.scss";
import { Canvas } from "@react-three/fiber";
import { Bounds, useBounds, Html, useProgress, OrbitControls, useGLTF } from "@react-three/drei";
import Earth from "./models/Earth";
import ISS from "./models/ISS";
import {solar_declination, sun_true_lon} from './utilities/sunUtilities'

const Loader = () => {
	const { progress } = useProgress();
	return <Html center>{progress} % loaded</Html>;
};

const ISSPosition = [-40, 0, 0];

console.log("declination",Math.cos(solar_declination(0))*1000)
console.log("longitude",sun_true_lon(0))

const App = () => {
	return (
		<>
			<Header />
			<Canvas orthographic camera={{ zoom: 10, position: [-100, 0, 0] }} dpr={[1, 2]}>
				<spotLight position={[0, -Math.sin(solar_declination(0))*1000, Math.sin(sun_true_lon(0))*1000]} intensity={5} angle={5} penumbra={1} />
				<hemisphereLight color="white" groundColor="#fff" position={[-7, 25, 13]} intensity={0.2} />
				<Suspense fallback={<Loader />}>
					<Bounds fit margin={1.4}>
						<SelectToZoom>
							<Model name="Earth" mat="Earth" position={[0, 0, 0]} scale={30} rotation={[0, 265*(Math.PI/180), 0]} />
							<Model name="ISS_1" mat="ISS_02_dull" position={ISSPosition} scale={20} />
							<Model name="ISS_2" mat="ISS_01_dull" position={ISSPosition} scale={20} />
							<Model name="ISS_3" mat="ISS_AO_05" position={ISSPosition} scale={20} />
							<Model name="ISS_4" mat="ISS_03_dull" position={ISSPosition} scale={20} />
							<Model name="ISS_5" mat="ecostress" position={ISSPosition} scale={20} />
							<Model name="ISS_7" mat="ecostressWhite" position={ISSPosition} scale={20} />
							<Model name="ISS_8" mat="ISS_03_dull.002" position={ISSPosition} scale={20} />
							<Model name="ISS_9" mat="ecostress metal" position={ISSPosition} scale={20} />
							<Model name="ISS_10" mat="ecostress_dexter" position={ISSPosition} scale={20} />
							<Model name="ISS_11" mat="white" position={ISSPosition} scale={20} />
							<Model name="ISS_12" mat="base_metal" position={ISSPosition} scale={20} />
							<Model name="ISS_13" mat="ISS_01_dull.001" position={ISSPosition} scale={20} />
							<Model name="ISS_14" mat="ISS_03_dull.001" position={ISSPosition} scale={20} />
							<Model name="ISS_15" mat="shiny_panel" position={ISSPosition} scale={20} />
							<Model name="ISS_16" mat="ISS_01_shiny_n" position={ISSPosition} scale={20} />
							<Model name="ISS_17" mat="ISS_AO_01" position={ISSPosition} scale={20} />
							<Model name="ISS_18" mat="ISS_AO_02" position={ISSPosition} scale={20} />
							<Model name="ISS_19" mat="ISS_AO_03" position={ISSPosition} scale={20} />
							<Model name="ISS_20" mat="ISS_01_dark *" position={ISSPosition} scale={20} />
							<Model name="ISS_21" mat="foil_silver" position={ISSPosition} scale={20} />
							<Model name="ISS_22" mat="ISS_03_shiny_n" position={ISSPosition} scale={20} />
							<Model name="ISS_23" mat="ISS_AO_04" position={ISSPosition} scale={20} />
							<Model name="ISS_24" mat="ISS_AO_06" position={ISSPosition} scale={20} />
							<Model name="ISS_25" mat="ISS_02_dark *" position={ISSPosition} scale={20} />
							<Model name="ISS_26" mat="ISS_04_dull" position={ISSPosition} scale={20} />
							<Model name="ISS_27" mat="ISS_AO_07" position={ISSPosition} scale={20} />
							<Model name="ISS_28" mat="olive *" position={ISSPosition} scale={20} />
							<Model name="ISS_29" mat="ISS_AO_08" position={ISSPosition} scale={20} />
						</SelectToZoom>
					</Bounds>
				</Suspense>
				<OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
			</Canvas>
		</>
	);
};

function Model({ name, ...props }) {
	const { nodes, materials } = useGLTF("./compressed.gltf");
	const { mat } = props;
	return <mesh geometry={nodes[name].geometry} material={materials[mat]} material-roughness={1} {...props} dispose={null} />;
}

function SelectToZoom({ children }) {
	const api = useBounds();
	return (
		<group onClick={(e) => (e.stopPropagation(), e.delta <= 10 && api.refresh(e.object).fit().margin(3))} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
			{children}
		</group>
	);
}

export default App;
