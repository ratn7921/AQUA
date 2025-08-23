import React from 'react';

export default function License() {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4 py-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30">
      <h1 className="text-2xl font-bold mb-4">License</h1>
      <p className="text-gray-700 mb-4">
        This project is provided under the MIT License. Unless otherwise noted, you may use, copy, modify,
        and distribute the software with attribution.
      </p>
      <pre className="text-xs bg-gray-50 p-4 rounded">{`MIT License\n\nCopyright (c) ${new Date().getFullYear()} AquaWeb\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\n[Full license text should be added here]
`}</pre>
    </div>
  );
}
