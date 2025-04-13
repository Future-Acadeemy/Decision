import React, { useState } from "react";

const DecisionMatrix = () => {
  const [decision1, setDecision1] = useState("");
  const [decision2, setDecision2] = useState("");
  const [matrix, setMatrix] = useState(Array(4).fill(Array(8).fill("")));
  const [totals, setTotals] = useState({ decision1: 0, decision2: 0 });
  const [columnSums, setColumnSums] = useState(Array(4).fill(0));

  const [decision, setDecision] = useState("");
  const [formula, setFormula] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    );
    setMatrix(newMatrix);
    updateColumnSums(newMatrix);
  };

  const updateColumnSums = (matrix) => {
    const sums = [0, 0, 0, 0];
    const counts = [0, 0, 0, 0]; // To track how many rows have a value for each respective column

    matrix.forEach((row) => {
      const val1 = parseFloat(row[1]);
      const val2 = parseFloat(row[3]);
      const val3 = parseFloat(row[5]);
      const val4 = parseFloat(row[7]);

      if (!isNaN(val1)) {
        sums[0] += val1;
        counts[0]++;
      }

      if (!isNaN(val2)) {
        sums[1] += val2;
        counts[1]++;
      }

      if (!isNaN(val3)) {
        sums[2] += val3;
        counts[2]++;
      }

      if (!isNaN(val4)) {
        sums[3] += val4;
        counts[3]++;
      }
    });

    const percentages = sums.map((sum, index) => {
      const base = counts[index] * 10;
      return base > 0 ? ((sum / base) * 100).toFixed(2) : 0;
    });

    setColumnSums(percentages);
  };

  const calculateTotals = () => {
    const decision_1_AdvantagesSum = columnSums[0];
    const decision_1_DisadvantagesSum = columnSums[1];
    const decision_2_AdvantagesSum = columnSums[2];
    const decision_2_DisadvantagesSum = columnSums[3];

    let sumDecision1 = 0;
    let sumDecision2 = 0;
    let criterion1 = 0;
    let criterion2 = 0;
    let criterion3 = 0;
    let criterion4 = 0;

    criterion1 += decision_1_AdvantagesSum - decision_1_DisadvantagesSum;
    criterion2 += decision_2_AdvantagesSum - decision_2_DisadvantagesSum;
    criterion3 += decision_1_AdvantagesSum - decision_2_AdvantagesSum;
    criterion4 += decision_2_DisadvantagesSum - decision_1_DisadvantagesSum;

    // console.log("sumDecision1 --> ", sumDecision1);
    // console.log("sumDecision2 --> ", sumDecision2);

    // console.log("criterion1 --> ", criterion1);
    // console.log("criterion2 --> ", criterion2);
    // console.log("criterion3 --> ", criterion3);
    // console.log("criterion4 --> ", criterion4);

    setTotals({ decision1: sumDecision1, decision2: sumDecision2 });

    setFormula([
      `Results of Criterion 1 = ${criterion1} → (Sum of Advantages - Disadvantages for Decision 1)`,
      `Results of Criterion 2 = ${criterion2} → (Sum of Advantages - Disadvantages for Decision 2)`,
      `Results of Criterion 3 = ${criterion3} → (Sum of Advantages of Decision 1 - Advantages of Decision 2)`,
      `Results of Criterion 4 = ${criterion4} → (Sum of Disadvantages of Decision 2 - Disadvantages of Decision 1)`,
    ]);

    let agreeCount = 0;
    if (criterion1 > 0) agreeCount++;
    if (criterion2 > 0) agreeCount++;
    if (criterion3 > 0) agreeCount++;
    if (criterion4 > 0) agreeCount++;

    console.log("agreeCount ===> ", agreeCount);

    // if (agreeCount >= 3) {
    //   setDecision("Decision 1 is preferable");
    // } else if (agreeCount <= 1) {
    //   setDecision("Decision 2 is preferable");
    // } else {
    //   setDecision("Both decisions have close values, reconsider inputs");
    // }

    if (criterion1 > criterion2 && criterion3 >= 0) {
      setDecision("Decision 1 is preferable");
    } else if ((criterion3 < 0 || criterion4 < 0) && criterion2 >= criterion1) {
      setDecision("Decision 2 is preferable");
    } else {
      setDecision("Both decisions have close values, reconsider inputs");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateTotals();
  };

  return (
    <div className="w-[90%] mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Title */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="font-bold text-blue-600 text-3xl text-center leading-tight mb-6">
            The Advantages and Disadvantages, Positives and Negatives, or Gains
            and Losses Style Scale:
            <br />
            <span className="text-gray-700 text-2xl">
              Prof. Dr. Hisham Abdelhamid Tohamy
            </span>
          </h2>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-100 text-gray-800 text-center">
                <th colSpan="4" className="border border-gray-300 px-4 py-3">
                  <input
                    type="text"
                    value={decision1}
                    onChange={(e) => setDecision1(e.target.value)}
                    placeholder="Decision 1"
                    className="w-full bg-gray-100 text-gray-900 p-2 text-center border border-gray-300 rounded-lg"
                  />
                </th>
                <th colSpan="4" className="border border-gray-300 px-4 py-3">
                  <input
                    type="text"
                    value={decision2}
                    onChange={(e) => setDecision2(e.target.value)}
                    placeholder="Decision 2"
                    className="w-full bg-gray-100 text-gray-900 p-2 text-center border border-gray-300 rounded-lg"
                  />
                </th>
              </tr>
              <tr className="bg-blue-200 text-gray-800 text-center">
                <th className="border border-gray-300 px-4 py-3">Advantages</th>
                <th className="border border-gray-300 px-4 py-3">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Disadvantages
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-3">Advantages</th>
                <th className="border border-gray-300 px-4 py-3">
                  Degree (1-4)
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Disadvantages
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Degree (1-4)
                </th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-3"
                    >
                      {colIndex % 2 === 1 ? (
                        <select
                          value={cell}
                          onChange={(e) =>
                            handleChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full bg-gray-100 text-gray-900 p-2 text-center border border-gray-300 rounded-lg"
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleChange(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full bg-gray-100 text-gray-900 p-2 text-center border border-gray-300 rounded-lg"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-blue-200 text-gray-800 text-center font-bold ">
                <td className="border-gray-300 px-4 py-3">Total percentage</td>
                <td className="border-gray-300 px-4 py-3">{columnSums[0]} %</td>
                <td className="border-gray-300 px-4 py-3"></td>
                <td className="border-gray-300 px-4 py-3">{columnSums[1]} %</td>
                <td className="border-gray-300 px-4 py-3"></td>
                <td className="border-gray-300 px-4 py-3">{columnSums[2]} %</td>
                <td className="border-gray-300 px-4 py-3"></td>
                <td className="border-gray-300 px-4 py-3">{columnSums[3]} %</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-blue-600 transition">
            Calculate
          </button>
        </div>
      </form>

      {/* Decision & Formula Results */}
      {decision && (
        <div className="text-center text-xl font-bold mt-6 bg-blue-100 p-5 border border-gray-300 rounded-lg shadow-md mb-6">
          <p className="text-blue-700 text-2xl mb-3">{decision}</p>
          <div className="mt-3 space-y-2 text-gray-700 text-lg">
            {formula.map((line, index) => (
              <p key={index} className="text-gray-800">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionMatrix;
