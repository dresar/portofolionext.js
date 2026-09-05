/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Extend Three.js dengan meshline - hanya sekali
let extended = false;
if (typeof window !== 'undefined') {
  try {
    extend({ MeshLineGeometry, MeshLineMaterial });
    extended = true;
  } catch (e) {
    // Already extended
  }
}

interface Lanyard3DProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  className?: string;
  cardImage?: string;
  width?: number;
  height?: number;
}

export default function Lanyard3D({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  className = '',
  cardImage,
  width = 400,
  height = 600
}: Lanyard3DProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure extend is called
    if (typeof window !== 'undefined' && !extended) {
      try {
        extend({ MeshLineGeometry, MeshLineMaterial });
        extended = true;
      } catch (e) {
        // Already extended
      }
    }
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  if (!mounted || typeof window === 'undefined') {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative z-0 w-full h-full flex justify-center items-center ${className}`} style={{ width, height }}>
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} cardImage={cardImage} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  cardImage?: string;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, cardImage }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  const segmentProps: any = {
    type: 'dynamic' as RigidBodyProps['type'],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  // Create card geometry
  const [cardGeometry] = useState(() => new THREE.PlaneGeometry(1.6, 2.25));
  const [clipGeometry] = useState(() => new THREE.BoxGeometry(0.05, 0.1, 0.05));
  const [clampGeometry] = useState(() => new THREE.BoxGeometry(0.1, 0.05, 0.05));
  
  const [cardTexture, setCardTexture] = useState<THREE.Texture | null>(null);
  const [lanyardTexture, setLanyardTexture] = useState<THREE.Texture | null>(null);
  const metalMaterial = useRef(new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.3 }));

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Load card image texture
    if (cardImage) {
      loader.load(
        cardImage,
        (texture) => {
          texture.flipY = false;
          setCardTexture(texture);
        },
        undefined,
        () => {
          // Fallback jika gagal load
        }
      );
    }

    // Load lanyard texture atau buat fallback
    loader.load(
      '/assets/lanyard/lanyard.png',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        setLanyardTexture(texture);
      },
      undefined,
      () => {
        // Fallback: create white texture dengan pattern
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 128, 128);
          // Add simple pattern
          ctx.fillStyle = '#000000';
          for (let i = 0; i < 128; i += 16) {
            ctx.fillRect(i, 0, 8, 128);
          }
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        fallbackTexture.wrapS = fallbackTexture.wrapT = THREE.RepeatWrapping;
        setLanyardTexture(fallbackTexture);
      }
    );
  }, [cardImage]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (!fixed.current || !band.current) return;
    
    if (dragged && typeof dragged !== 'boolean' && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z
      });
    }
    
    if (j1.current && j2.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
    }
    
    if (j3.current && card.current && band.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.current.copy(card.current.angvel());
      rot.current.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.current.x, y: ang.current.y - rot.current.y * 0.25, z: ang.current.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              if (card.current) {
                const cardPos = card.current.translation();
                drag(new THREE.Vector3().copy(e.point).sub(new THREE.Vector3(cardPos.x, cardPos.y, cardPos.z)));
              }
            }}
          >
            <mesh geometry={cardGeometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={clipGeometry} material={metalMaterial.current} />
            <mesh geometry={clampGeometry} material={metalMaterial.current} />
          </group>
        </RigidBody>
      </group>
      {lanyardTexture && (
        <mesh ref={band}>
          <meshLineGeometry />
          <meshLineMaterial
            color="white"
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            useMap
            map={lanyardTexture}
            repeat={[-4, 1]}
            lineWidth={1}
          />
        </mesh>
      )}
    </>
  );
}
