import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, PlusCircle, Trash2, Repeat, Table, CheckCircle2, AlertCircle } from 'lucide-react';

export const PythonDictionariesWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'access' | 'change' | 'remove' | 'loop'>('access');

  // Access State
  const [searchKey, setSearchKey] = useState<string>('age');
  const [useGetMethod, setUseGetMethod] = useState<boolean>(true);
  const [defaultValue, setDefaultValue] = useState<string>('Not Provided');

  // Dict Data
  const studentDict: Record<string, any> = {
    name: 'Maya',
    age: 21,
    course: 'Python',
    city: 'Hyderabad'
  };

  const computeAccess = () => {
    const exists = searchKey in studentDict;
    if (useGetMethod) {
      const val = studentDict[searchKey] !== undefined ? studentDict[searchKey] : defaultValue;
      return {
        code: `student.get("${searchKey}", "${defaultValue}")`,
        result: JSON.stringify(val),
        isError: false,
        note: exists ? `Key "${searchKey}" found!` : `Key "${searchKey}" not found. Safely returned default fallback value "${defaultValue}".`
      };
    } else {
      if (!exists) {
        return {
          code: `student["${searchKey}"]`,
          result: `KeyError: '${searchKey}'`,
          isError: true,
          note: `Bracket lookup dict[key] raises KeyError when key is missing!`
        };
      }
      return {
        code: `student["${searchKey}"]`,
        result: JSON.stringify(studentDict[searchKey]),
        isError: false,
        note: `Key "${searchKey}" found via direct bracket lookup!`
      };
    }
  };

  const accessRes = computeAccess();

  return (
    <div className="my-8 bg-[#020617] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl shadow-cyan-500/10 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl flex items-center justify-center text-cyan-400">
            <BookOpen size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              CodeFlow Python Dictionaries Studio
              <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30 uppercase tracking-wide">
                Key → Value Mappings • &lt;class 'dict'&gt;
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Explore key-value lookup, safe get() defaults, key assignment vs addition, and dict iteration.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-white/10 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveTab('access')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'access' ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Access & get()
          </button>
          <button
            onClick={() => setActiveTab('change')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'change' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Change vs Add
          </button>
          <button
            onClick={() => setActiveTab('remove')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'remove' ? 'bg-red-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Removal Rules
          </button>
          <button
            onClick={() => setActiveTab('loop')}
            className={`px-3 py-1 rounded-xl transition-all ${
              activeTab === 'loop' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Looping
          </button>
        </div>
      </div>

      {/* Tab 1: Access & get() */}
      {activeTab === 'access' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Key to Lookup:</label>
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl p-2.5 text-white font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-400 font-sans font-bold text-xs uppercase">Lookup Syntax Mode:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUseGetMethod(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    !useGetMethod ? 'bg-red-950 border-red-500 text-red-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  dict[key] (Brackets)
                </button>
                <button
                  onClick={() => setUseGetMethod(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold font-sans border transition-all ${
                    useGetMethod ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-white/10 text-gray-400'
                  }`}
                >
                  dict.get(key, default)
                </button>
              </div>
            </div>
          </div>

          {/* Access Result Display */}
          {accessRes.isError ? (
            <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-5 text-red-200 font-mono text-xs">
              <div className="flex items-center gap-2 font-bold text-red-400">
                <AlertCircle size={16} /> {accessRes.result}
              </div>
              <p className="font-sans text-xs text-red-300 pt-1">{accessRes.note}</p>
            </div>
          ) : (
            <div className="bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-2 font-mono text-xs">
              <div className="text-cyan-400 font-bold uppercase text-[11px] font-sans flex justify-between">
                <span>Executed Lookup Statement</span>
                <span className="text-emerald-400 font-bold">Result Value Found</span>
              </div>
              <div className="text-base font-bold text-cyan-300 bg-slate-900 p-3 rounded-xl border border-white/10">
                {accessRes.code} → <span className="text-emerald-400">{accessRes.result}</span>
              </div>
              <p className="text-gray-400 font-sans text-xs pt-1">{accessRes.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Change vs Add */}
      {activeTab === 'change' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
            <div className="text-emerald-400 font-bold uppercase text-[11px] font-sans">
              dict[key] = value Execution Logic Rule
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-cyan-300 font-bold text-sm">IF KEY EXISTS:</div>
                <div className="text-white">student["age"] = 22</div>
                <p className="text-gray-400 font-sans text-xs">Overwrites existing value (21 → 22). Length stays unchanged.</p>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-white/10 space-y-1">
                <div className="text-emerald-300 font-bold text-sm">IF KEY IS NEW:</div>
                <div className="text-white">student["email"] = "a@b.com"</div>
                <p className="text-gray-400 font-sans text-xs">Adds NEW key-value pair! Length increases by +1.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Removal Rules */}
      {activeTab === 'remove' && (
        <div className="bg-slate-950 rounded-2xl border border-white/10 p-5 font-mono text-xs space-y-3">
          <div className="text-gray-400 font-sans font-bold text-xs uppercase">
            Section 49 Dictionary Removal Methods Matrix
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-cyan-400 font-bold">
                  <th className="p-2">Operation</th>
                  <th className="p-2">Syntax</th>
                  <th className="p-2">Returns</th>
                  <th className="p-2">Missing Key Result</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y divide-white/5">
                <tr>
                  <td className="p-2 text-cyan-300 font-bold">pop(key)</td>
                  <td className="p-2">dict.pop("age")</td>
                  <td className="p-2 text-emerald-400">Removed Value (21)</td>
                  <td className="p-2 text-red-400 font-bold">KeyError (unless default given)</td>
                </tr>
                <tr>
                  <td className="p-2 text-purple-300 font-bold">popitem()</td>
                  <td className="p-2">dict.popitem()</td>
                  <td className="p-2 text-purple-400">(key, value) Tuple</td>
                  <td className="p-2 text-red-400 font-bold">KeyError (if empty)</td>
                </tr>
                <tr>
                  <td className="p-2 text-amber-300 font-bold">del statement</td>
                  <td className="p-2">del dict["age"]</td>
                  <td className="p-2 text-gray-500">None (Statement)</td>
                  <td className="p-2 text-red-400 font-bold">KeyError</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-300 font-bold">clear()</td>
                  <td className="p-2">dict.clear()</td>
                  <td className="p-2 text-gray-500">None</td>
                  <td className="p-2 text-emerald-400">Safe (Resets to &#123;&#125;)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Looping */}
      {activeTab === 'loop' && (
        <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-3 font-mono text-xs">
          <div className="text-purple-400 font-bold uppercase text-[11px] font-sans">
            Dictionary Traversal Methods
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-cyan-300 font-bold">for k in dict.keys():</div>
              <div className="text-gray-400">Visits keys: "name", "age", "course"</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-emerald-300 font-bold">for v in dict.values():</div>
              <div className="text-gray-400">Visits values: "Maya", 21, "Python"</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-purple-300 font-bold">for k, v in dict.items():</div>
              <div className="text-gray-400">Unpacks (key, value) pairs simultaneously</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
