import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Earth(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/Earth-compressed.glb");
  return (
    <group scale={50} ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Default OBJ"]}
      />
    </group>
  );
}

useGLTF.preload("/Earth-compressed.glb");