"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface StudentsProps {
  students: any[];
}

export default function Students({
  students,
}: StudentsProps) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewData, setPreviewData] =
    useState<any[]>([]);

  function downloadCSV() {

    const worksheet =
      XLSX.utils.json_to_sheet(students);

    const csv =
      XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(
      blob,
      "Students_Report.csv"
    );
  }

  function downloadExcel() {

    const worksheet =
      XLSX.utils.json_to_sheet(students);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    XLSX.writeFile(
      workbook,
      "Students_Report.xlsx"
    );
  }

  function chooseExcel() {
    fileInputRef.current?.click();
  }

  function handleExcelSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      e.target.files?.[0];

    if (!file) return;

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (
      extension !== "xlsx" &&
      extension !== "xls"
    ) {
      alert(
        "Please upload an Excel file."
      );
      return;
    }

    setSelectedFile(file);
    setPreviewData([]);
  }

  async function uploadExcel() {

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (e) => {

      const data =
        new Uint8Array(
          e.target?.result as ArrayBuffer
        );

      const workbook =
        XLSX.read(data, {
          type: "array",
        });

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const json =
        XLSX.utils.sheet_to_json(
          worksheet
        );

      setPreviewData(
        json as any[]
      );
    };

    reader.readAsArrayBuffer(
      selectedFile
    );
  }

  return (

  <div className="space-y-6 md:space-y-8">

    {/* Hero */}

    <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-zinc-900 to-black p-5 md:p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex-1">

          <p className="uppercase tracking-[0.45em] text-[11px] md:text-sm text-yellow-400">

            Curious Minds

          </p>

          <h1 className="mt-2 text-3xl md:text-6xl font-bold leading-tight">

            Student
            <br />
            Management

          </h1>

          <p className="mt-4 text-sm md:text-lg text-zinc-400 max-w-2xl">

            Manage registered students,
            export reports, upload faculty
            Excel files and preview imported
            data before processing.

          </p>

        </div>

        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[300px]">

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

            <p className="text-xs md:text-sm text-yellow-400">

              Students

            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-bold">

              {students.length}

            </h2>

          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">

            <p className="text-xs md:text-sm text-yellow-400">

              Excel Ready

            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-bold">

              ✓

            </h2>

          </div>

        </div>

      </div>

    </div>
        {/* Action Buttons */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <button
        onClick={downloadCSV}
        className="group rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-yellow-400">
              Export
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Download CSV
            </h3>

          </div>

          <div className="text-4xl">
            📄
          </div>

        </div>

      </button>

      <button
        onClick={downloadExcel}
        className="group rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-green-400"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-green-400">
              Export
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Download Excel
            </h3>

          </div>

          <div className="text-4xl">
            📊
          </div>

        </div>

      </button>

      <button
        onClick={chooseExcel}
        className="group rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-blue-400"
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-blue-400">
              Import
            </p>

            <h3 className="mt-1 text-xl font-bold">
              Upload Excel
            </h3>

          </div>

          <div className="text-4xl">
            📤
          </div>

        </div>

      </button>

    </div>

    <input
      ref={fileInputRef}
      type="file"
      accept=".xlsx,.xls"
      className="hidden"
      onChange={handleExcelSelect}
    />

    {/* Selected File */}
        {selectedFile && (

      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-zinc-900 to-black p-5 md:p-7">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div className="flex items-start gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-3xl">

              📄

            </div>

            <div>

              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">

                Excel File Selected

              </div>

              <h2 className="mt-3 text-2xl md:text-3xl font-bold">

                {selectedFile.name}

              </h2>

              <p className="mt-2 text-zinc-400">

                File Size:
                {" "}
                {(selectedFile.size / 1024).toFixed(2)}
                {" "}
                KB

              </p>

              <p className="mt-1 text-sm text-zinc-500">

                Ready to preview and import data.

              </p>

            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            <button
              onClick={uploadExcel}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-bold transition-all duration-300 hover:bg-blue-500 hover:scale-[1.02]"
            >

              📖 Read Excel

            </button>

            <button
              onClick={() => {

                setSelectedFile(null);
                setPreviewData([]);

                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }

              }}
              className="rounded-2xl border border-zinc-700 px-6 py-3 font-semibold transition-all duration-300 hover:border-red-500 hover:text-red-400"

            >

              ✖ Remove

            </button>

          </div>

        </div>

      </div>

    )}

    {/* Excel Preview */}
        {previewData.length > 0 && (

      <div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">

              📋 Excel Preview

            </h2>

            <p className="mt-2 text-sm md:text-base text-zinc-400">

              Preview the uploaded Excel data before importing it into the system.

            </p>

          </div>

          <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2">

            <span className="font-semibold text-yellow-400">

              {previewData.length} Records

            </span>

          </div>

        </div>

        <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">

          <table className="min-w-full">

            <thead className="sticky top-0 bg-black">

              <tr>

                {Object.keys(previewData[0]).map((key) => (

                  <th
                    key={key}
                    className="whitespace-nowrap border-b border-zinc-800 px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-yellow-400"
                  >

                    {key}

                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {previewData.map((row: any, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800 transition hover:bg-zinc-800/50"
                >

                  {Object.values(row).map((value: any, i) => (

                    <td
                      key={i}
                      className="whitespace-nowrap px-5 py-4 text-sm text-zinc-200"
                    >

                      {String(value)}

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    )}

    {/* Students Table */}
        <div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">

            👨‍🎓 Registered Students

          </h2>

          <p className="mt-2 text-sm md:text-base text-zinc-400">

            Complete list of all registered students with their academic progress.

          </p>

        </div>

        <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2">

          <span className="font-semibold text-yellow-400">

            {students.length} Students

          </span>

        </div>

      </div>

      <div className="overflow-x-auto rounded-3xl border border-zinc-800 bg-zinc-900">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-black">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Name
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Std
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Batch
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Hours
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Questions
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Physics
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Chemistry
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Maths
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Biology
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-yellow-400">
                Test Score
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.gmail}
                className="border-b border-zinc-800 transition-all duration-200 hover:bg-zinc-800/50"
              >
                                <td className="px-5 py-4 whitespace-nowrap">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-sm font-bold text-black shadow-lg">

                      {student.name?.charAt(0)?.toUpperCase() || "S"}

                    </div>

                    <div>

                      <p className="font-semibold text-white">

                        {student.name}

                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-4 whitespace-nowrap">

                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium">

                    {student.std}

                  </span>

                </td>

                <td className="px-5 py-4 whitespace-nowrap">

                  <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400">

                    {student.batch}

                  </span>

                </td>

                <td className="px-5 py-4 text-center font-semibold">

                  {student.studyHours}

                </td>

                <td className="px-5 py-4 text-center font-semibold">

                  {student.questions}

                </td>

                <td className="px-5 py-4 text-center">

                  {student.physics}

                </td>

                <td className="px-5 py-4 text-center">

                  {student.chemistry}

                </td>

                <td className="px-5 py-4 text-center">

                  {student.maths}

                </td>

                <td className="px-5 py-4 text-center">

                  {student.biology}

                </td>

                <td className="px-5 py-4 text-center">

                  <span className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 font-bold text-yellow-400">

                    {student.testScore || "-"}

                  </span>

                </td>

              </tr>

            ))}
                      </tbody>

        </table>

      </div>

    </div>
  </div>

);
}