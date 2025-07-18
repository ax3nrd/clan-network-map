"use client";
import node_data from '@/data/nodeData';
import edge_data from '@/data/edgeData';
import NetworkDiagram from '@/components/D3Graph';
import { Julius_Sans_One } from 'next/font/google';
import { IBM_Plex_Mono } from 'next/font/google';
import {useEffect, useRef, useState} from 'react';
import { Info } from 'lucide-react';


const juliusSansOne = Julius_Sans_One({ subsets: ['latin'], weight: '400' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '400' });

export default function HomePage() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <main className="bg-[#1E1E1E] min-h-screen">
      <header className="bg-[#1E1E1E] text-white flex items-center justify-between px-10 py-6">
        <div className="flex items-center space-x-4">
          <img src="/up-logo.png" alt="UPB Logo" className="h-12 w-auto"/>
          <h1 className={juliusSansOne.className + " text-[#DFDEDE] text-xl font-semibold tracking-widest"}>UPB Network Diagram</h1>
        </div>
        <div className="relative group">
          <Info className="h-7.5 w-auto text-white cursor-pointer" />
          <div className={ibmPlexMono.className + " absolute right-0 mt-2 w-max bg-[#2D2D2D] text-[#DFDEDE] text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300"}>
            Click the node to see the detailed view of ports.
          </div>
        </div>
      </header>

      <div ref={containerRef} className="w-full h-[100vh] relative">
        <div className="absolute w-45 top-5 left-5 bg-[#2D2D2D] text-white p-3 rounded shadow-md text-sm  space-y-1">
          <div className="flex items-center space-x-2 bottom-10">
            <span>Connection Types</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className="w-10 h-0.5 bg-[#F58315] rounded-sm"></div>
            <span>Ethernet</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-0.5 bg-[#1594F5] rounded-sm"></div>
            <span>Fiber Optic</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 border-t-2 border-dashed border-[#1CE637]"></div>
            <span>Wireless</span>
          </div>
        </div>

        <NetworkDiagram
          nodeData={node_data}
          edgeData={edge_data}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </main>
  );
}
