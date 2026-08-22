import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripService } from '../../services/tripService';
import { Trip, Expense } from '../../services/api';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const Budget: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  // Modal form state
  const [modalOpen, setModalOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<Expense['category']>('Other');
  const [expenseDate, setExpenseDate] = useState('');

  // Limit edit state
  const [limitEditOpen, setLimitEditOpen] = useState(false);
  const [newLimit, setNewLimit] = useState('');

  const loadTripData = async () => {
    if (!id) return;
    try {
      const tripData = await tripService.getTripById(id);
      if (tripData) {
        setTrip(tripData);
        setNewLimit(tripData.budget?.totalLimit.toString() || '2000');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Failed to load trip budget details:', err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTripData();
  }, [id]);

  const handleAddExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !expenseTitle || !expenseAmount) return;

    const amount = parseFloat(expenseAmount) || 0;
    const date = expenseDate || new Date().toISOString().split('T')[0];

    try {
      await tripService.addExpense(id, expenseTitle, amount, expenseCategory, date);
      
      // Clear inputs
      setExpenseTitle('');
      setExpenseAmount('');
      setExpenseCategory('Other');
      setExpenseDate('');
      setModalOpen(false);
      await loadTripData();
    } catch (err) {
      console.error('Failed to add expense:', err);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await tripService.deleteExpense(id, expenseId);
        await loadTripData();
      } catch (err) {
        console.error('Failed to delete expense:', err);
        alert('Failed to delete expense.');
      }
    }
  };

  const handleUpdateLimitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const limit = parseFloat(newLimit) || 0;
    try {
      await tripService.updateBudgetLimit(id, limit);
      setLimitEditOpen(false);
      await loadTripData();
    } catch (err) {
      console.error('Failed to update limit:', err);
      alert('Failed to update limit.');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <span className="material-symbols-outlined text-[48px] animate-spin text-primary">progress_activity</span>
        <p className="font-label-md text-deep-forest/60 mt-4">Analyzing trip budget sheets...</p>
      </div>
    );
  }

  if (!trip || !trip.budget) return null;

  const budget = trip.budget;
  const spent = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget.totalLimit - spent;
  const pct = Math.min(Math.round((spent / budget.totalLimit) * 100), 100);
  const isOver = spent > budget.totalLimit;

  // Group expenses by category
  const categories = ['Accommodation', 'Transport', 'Food', 'Activities', 'Other'] as const;
  const categorySummary = categories.map(cat => {
    const total = budget.expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0);
    const catPct = spent > 0 ? Math.round((total / spent) * 100) : 0;
    return { name: cat, total, pct: catPct };
  });

  const categoryIcons: Record<Expense['category'], string> = {
    Accommodation: 'hotel',
    Transport: 'train',
    Food: 'restaurant',
    Activities: 'hiking',
    Other: 'payments'
  };

  return (
    <div className="flex-grow w-full flex flex-col gap-6 py-2 text-left">
      {/* Sub Navigation / Header tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <span className="font-label-sm text-[12px] text-terracotta uppercase tracking-wider font-semibold">Budget Management</span>
          <h1 className="font-display-lg text-[32px] md:text-[36px] font-bold text-primary">{trip.name}</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to={`/trips/${trip.id}/builder`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Builder
          </Link>
          <Link to={`/trips/${trip.id}/itinerary`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Itinerary
          </Link>
          <Link to={`/trips/${trip.id}/budget`} className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-[12px] uppercase tracking-wide">
            Budget
          </Link>
          <Link to={`/trips/${trip.id}/calendar`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors">
            Calendar
          </Link>
          <Link to={`/share/token-${trip.id}`} className="px-4 py-2 bg-white border border-outline-variant/30 hover:bg-surface-container rounded-full font-label-sm text-[12px] text-primary uppercase tracking-wide transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">share</span> Share
          </Link>
        </nav>
      </div>

      {/* Overview Dashboard Card */}
      <section className="bg-white border border-outline-variant/30 p-8 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-outline-variant/30">
          {/* Total budget */}
          <div className="space-y-1 py-3 sm:py-0">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Total Limit</span>
            <div className="flex items-center gap-2">
              <span className="text-[36px] font-bold text-primary leading-none">${budget.totalLimit}</span>
              <button
                onClick={() => setLimitEditOpen(true)}
                className="text-secondary hover:text-primary transition-colors flex items-center"
                title="Edit Limit"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>
          </div>
          {/* Total spent */}
          <div className="space-y-1 py-3 sm:py-0 sm:pl-6">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Total Spent</span>
            <span className={`text-[36px] font-bold leading-none ${isOver ? 'text-error' : 'text-primary'}`}>
              ${spent}
            </span>
          </div>
          {/* Remaining */}
          <div className="space-y-1 py-3 sm:py-0 sm:pl-6">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider block">Remaining</span>
            <span className={`text-[36px] font-bold leading-none ${remaining < 0 ? 'text-error' : 'text-primary'}`}>
              ${remaining}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-error' : 'bg-primary'}`}
              style={{ width: `${pct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[12px] font-semibold text-on-surface-variant">
            <span>{pct}% of limit exhausted</span>
            <span className={isOver ? 'text-error' : 'text-primary'}>
              {isOver ? 'Over budget limit' : `$${remaining} under limit`}
            </span>
          </div>
        </div>
      </section>

      {/* Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (5 Columns) - Category Summary */}
        <div className="lg:col-span-5 bg-white border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-6">
          <header className="border-b border-outline-variant/30 pb-4">
            <h3 className="font-headline-sm text-[22px] font-bold text-primary font-semibold">Category Breakdown</h3>
          </header>

          <div className="space-y-5">
            {categorySummary.map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="flex items-center gap-2 font-medium text-primary">
                    <span className="material-symbols-outlined text-[18px] text-primary/70">
                      {categoryIcons[cat.name]}
                    </span>
                    {cat.name === 'Food' ? 'Food & Dining' : cat.name}
                  </span>
                  <span className="font-bold text-primary">
                    ${cat.total} <span className="text-[12px] text-on-surface-variant font-normal">({cat.pct}%)</span>
                  </span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-secondary transition-all duration-500"
                    style={{ width: `${cat.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7 Columns) - Transactions list */}
        <div className="lg:col-span-7 bg-white border border-outline-variant/30 rounded-xl p-6 md:p-8 space-y-6">
          <header className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
            <h3 className="font-headline-sm text-[22px] font-bold text-primary font-semibold">Transactions Log</h3>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-primary text-on-primary hover:bg-surface-tint border border-outline-variant/30 font-label-sm text-[12px] px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">add</span> Add Expense
            </button>
          </header>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {budget.expenses.length > 0 ? (
              [...budget.expenses]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-lg flex justify-between items-center hover:border-primary/20 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">
                          {categoryIcons[exp.category]}
                        </span>
                      </span>
                      <div>
                        <h4 className="font-semibold text-primary text-[14px] leading-tight">{exp.title}</h4>
                        <p className="text-[11.5px] text-on-surface-variant flex items-center gap-2 mt-1">
                          <span className="capitalize">{exp.category === 'Food' ? 'Food & Dining' : exp.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary text-[15px]">${exp.amount}</span>
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        title="Remove Expense"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="py-12 text-center text-on-surface-variant italic text-[14px]">
                No expenses logged for this trip yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Add Expense */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Log Budget Expense"
      >
        <form onSubmit={handleAddExpenseSubmit} className="space-y-6 text-left">
          <Input
            id="title"
            label="Transaction Title"
            placeholder="e.g., Dinner at Genki Sushi"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              id="amount"
              type="number"
              label="Amount ($)"
              placeholder="e.g. 50"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-primary uppercase tracking-wider block">
                Category
              </label>
              <select
                className="w-full bg-surface border border-outline-variant/60 rounded-lg px-4 py-2.5 font-body-md text-body-md focus:outline-none focus:border-b-2 focus:border-b-primary cursor-pointer"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value as Expense['category'])}
                required
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'Food' ? 'Food & Dining' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            id="date"
            type="date"
            label="Date of Transaction"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />

          <Button type="submit" variant="primary" fullWidth className="py-3 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
            Log Transaction
          </Button>
        </form>
      </Modal>

      {/* Modal: Edit Budget Limit */}
      <Modal
        isOpen={limitEditOpen}
        onClose={() => setLimitEditOpen(false)}
        title="Edit Budget Limit"
      >
        <form onSubmit={handleUpdateLimitSubmit} className="space-y-6 text-left">
          <Input
            id="limitAmount"
            type="number"
            label="Total Trip Budget Limit ($)"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth className="py-3 bg-primary hover:bg-surface-tint rounded-xl font-semibold">
            Save Limit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Budget;
