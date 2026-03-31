import sys
import re

with open('src/components/MapCompare/Analysis.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove DATA_CONFIG_ANUGUL
content = re.sub(r'const DATA_CONFIG_ANUGUL: any = \{.*?\n\};\n\n', '', content, flags=re.DOTALL)

# 2. Update config logic
content = content.replace("""    const config = (selectedDistrict === 'Anugul' && DATA_CONFIG_ANUGUL[currentLayerKey])
        ? DATA_CONFIG_ANUGUL[currentLayerKey]
        : DATA_CONFIG[currentLayerKey];""",
"""    const config = DATA_CONFIG[currentLayerKey];""")

# 3. Handle Map Instances
content = content.replace("""    const leftMapRef = useRef<HTMLDivElement>(null);
    const rightMapRef = useRef<HTMLDivElement>(null);""", """    const leftMapRef = useRef<HTMLDivElement>(null);""")

content = content.replace("""    const leftMapObj = useRef<maplibregl.Map | null>(null);
    const rightMapObj = useRef<maplibregl.Map | null>(null);
    const leftMarkerRef = useRef<maplibregl.Marker | null>(null);
    const rightMarkerRef = useRef<maplibregl.Marker | null>(null);""", """    const leftMapObj = useRef<maplibregl.Map | null>(null);
    const leftMarkerRef = useRef<maplibregl.Marker | null>(null);""")

content = content.replace("""    const [dividerX, setDividerX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);""", "")

# Remove marker display logic for right map
content = re.sub(r"""            if \(rightMapObj\.current && !rightMarkerRef\.current\) \{.*?\} else if \(rightMarkerRef\.current\) \{.*?\}""", "", content, flags=re.DOTALL)
content = re.sub(r"""            if \(rightMarkerRef\.current\) \{.*?\}""", "", content, flags=re.DOTALL)

# 4. Handle Map Click logic (remove 2018 LULC val)
content = content.replace("""    const [lulc2018Val, setLulc2018Val] = useState<number | null>(null);""", "")
content = content.replace("""        setLulc2018Val(null);""", "")
content = re.sub(r"""        try \{\s*locationValues\(LULC_2018_URL, \{ latitude: lngLat\.lat, longitude: lngLat\.lng \}, zoom\)\.then\(vals => \{\s*if \(vals && vals\.length > 0 && !isNaN\(vals\[0\]\)\) setLulc2018Val\(vals\[0\]\);\s*\}\)\.catch\(e => console\.error\("Error fetching 2018 LULC", e\)\);\s*\} catch \(e\) \{ console\.error\(e\); \}""", "", content)

content = content.replace("        const side = mapInstance === leftMapObj.current ? 'left' : 'right';", "        const side = 'left';")

# 5. Handle initial map load (remove right map load and sync logic)
content = re.sub(r"""        // Initialize Right Map if ref exists.*?(?=        // Sync Logic)""", "", content, flags=re.DOTALL)
content = re.sub(r"""        // Sync Logic.*?if \(leftMapObj\.current && rightMapObj\.current\) \{.*?\}""", "", content, flags=re.DOTALL)
content = re.sub(r"""            try \{\s*if \(rightMapObj\.current\) \{\s*rightMapObj\.current\.remove\(\);\s*rightMapObj\.current = null;\s*\}\s*\} catch \(e\) \{ console\.warn\('Right map cleanup error', e\); \}""", "", content, flags=re.DOTALL)

# 6. Adjust UpdateMainLayer (only left map, use rightUrl (year2) since we only want 2024)
content = content.replace("""    useEffect(() => {
        if (!leftMapObj.current || !rightMapObj.current) return;

        const type = ['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster';

        updateMainLayer(leftMapObj.current, 'left', leftUrl, type, currentLayerKey);
        updateMainLayer(rightMapObj.current, 'right', rightUrl, type, currentLayerKey);

    }, [leftUrl, rightUrl, currentLayerKey, activeLulcPixel]);""", """    useEffect(() => {
        if (!leftMapObj.current) return;

        const type = ['urbansprawl', 'roads'].includes(currentLayerKey) ? 'vector' : 'raster';

        updateMainLayer(leftMapObj.current, 'left', rightUrl, type, currentLayerKey);
    }, [rightUrl, currentLayerKey, activeLulcPixel]);""")

content = content.replace("mapsLoadedCount < 2", "mapsLoadedCount < 1")
content = re.sub(r"            \{ map: rightMapObj\.current, idx: 'right' \}\n?", "", content, flags=re.DOTALL)

# Divider Logic
content = re.sub(r"""    // Slider Dragging Logic.*?(?=    // Data processing for left and right side)""", "", content, flags=re.DOTALL)
content = re.sub(r"""    // Initialize Divider.*?(?=    // Register Protocols)""", "", content, flags=re.DOTALL)

# The return block
return_pos = content.find("    return (\n        <div className=\"flex flex-col xl:flex-row gap-8 w-full\">")
new_return = """    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Map Area */}
            <div className="relative w-full rounded-xl shadow-sm border border-gray-200">
                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] overflow-hidden select-none rounded-lg"
                >
                    <div className="absolute top-4 left-4 z-40 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-md text-sm font-medium shadow border border-white/30">
                        {y2}
                    </div>

                    {/* MAP */}
                    <div
                        ref={leftMapRef}
                        className="relative w-full h-[500px] overflow-hidden select-none"
                    />
                    
                    {/* Hover Selection Info */}
                    {(selectedLngLat && lulc2024Val !== null) ? (
                        <div className="absolute bottom-4 left-4 z-40 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-md shadow border border-white/10 flex flex-col uppercase text-[12px] font-medium tracking-wide">
                            <span className="text-gray-400 text-[10px] mb-1">
                                {Math.abs(selectedLngLat.lng).toFixed(2)} {selectedLngLat.lng >= 0 ? 'E' : 'W'}, {Math.abs(selectedLngLat.lat).toFixed(2)} {selectedLngLat.lat >= 0 ? 'N' : 'S'}
                            </span>
                            <span className="text-white text-[13px]">{getLulcName(lulc2024Val)}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
"""

if return_pos != -1:
    content = content[:return_pos] + new_return

with open('src/components/MapCompare/Analysis.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
