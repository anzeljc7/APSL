# Flik Pay Mobile Application

A React Native mobile payment app built with Expo, inspired by the Flik Pay system for UniCredit Bank Slovenia customers. Now enhanced with **Splitwise-like expense splitting functionality** for group expense management.

## Features

### 🔐 Authentication
- **Login Screen**: Tax number and activation code authentication
- **PIN Setup**: Secure 4-6 digit PIN creation
- **Biometric Support**: Fingerprint and face ID integration

### 💰 Payment Features
- **Send Money**: Transfer funds to contacts via phone/email
- **QR Payments**: Scan QR codes for instant payments
- **Request Money**: Send payment requests to contacts
- **Transaction History**: View all past transactions with filtering

### 👥 **Group Expense Management (Splitwise-like)**
- **Create Groups**: Set up groups for different contexts (roommates, friends, family)
- **Join/Leave Groups**: Easy group membership management
- **Add Expenses**: Track shared expenses with detailed splitting options
- **Smart Splitting**: Equal, exact amount, percentage, or shares-based splitting
- **Automatic Debt Calculation**: Intelligent debt settlement with minimum transactions
- **Real-time Balances**: See who owes what in real-time
- **Settlement Tracking**: Track and manage debt settlements

### 🏠 Main Dashboard
- **Balance Display**: Real-time account balance
- **Quick Actions**: Easy access to main features including groups
- **Recent Transactions**: Latest payment activity
- **Modern UI**: Clean, intuitive interface

### ⚙️ Settings & Management
- **Profile Management**: Update personal information
- **Security Settings**: PIN, biometric, and 2FA options
- **Preferences**: Notifications, language, dark mode
- **Account Management**: Logout and account deletion

## Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with stack and tab navigation
- **State Management**: React Context API
- **UI Components**: Custom components with consistent styling
- **Icons**: Expo Symbols for native iOS/Android icons
- **Platform Support**: iOS, Android, and Web

## Project Structure

```
app/
├── _layout.tsx              # Root layout with navigation
├── login.tsx                # Authentication screen
├── pin-setup.tsx           # PIN creation screen
├── send-money.tsx          # Money transfer screen
├── qr-payment.tsx          # QR code payment screen
├── groups.tsx              # Groups management screen
├── add-expense.tsx         # Add expense screen
├── group/
│   └── [groupId].tsx      # Group detail screen
└── (tabs)/                 # Tab navigation screens
    ├── _layout.tsx         # Tab layout configuration
    ├── index.tsx          # Home dashboard
    ├── groups.tsx         # Groups tab
    ├── transactions.tsx   # Transaction history
    └── settings.tsx       # Settings and preferences

contexts/
└── AppContext.tsx         # Global state management with expense splitting

components/
└── ui/                    # Reusable UI components
```

## Key Features Implemented

### 🎨 Design System
- Consistent Flik branding with black logo and blue accents
- Modern card-based layout with shadows and rounded corners
- Responsive design for different screen sizes
- Clean typography and spacing

### 🔄 State Management
- Global context for user data and transactions
- Real-time balance updates
- Transaction history management
- Authentication state handling

### 👥 **Expense Splitting System**
- **Group Management**: Create, join, and manage expense groups
- **Smart Splitting**: Multiple splitting methods (equal, exact, percentage, shares)
- **Debt Calculation**: Automatic debt settlement with minimum transactions
- **Real-time Balances**: Live updates of who owes what
- **Expense Tracking**: Detailed expense history with categories
- **Settlement Management**: Track and process debt settlements

### 📱 User Experience
- Intuitive navigation flow
- Loading states and error handling
- Form validation and user feedback
- Smooth animations and transitions

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Run on Device**
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web Browser
   ```

## Mock Data

The app includes realistic mock data for demonstration:
- Sample user profile with balance
- Transaction history with various payment types
- Contact information and payment details
- **Sample Groups**: Roommates and vacation friends groups
- **Expense Categories**: Food, transport, entertainment, etc.
- **Member Management**: Multiple users with different balances

## Security Features

- PIN-based authentication
- Biometric login support
- Secure transaction processing
- Balance validation before payments
- Account protection measures

## Future Enhancements

- Real API integration with banking backend
- Push notifications for payments and expense updates
- Contact synchronization
- Advanced security features
- Multi-language support
- Dark mode implementation
- **Receipt Scanning**: OCR for automatic expense entry
- **Location Services**: Auto-suggest merchants based on location
- **Advanced Analytics**: Spending insights and reports
- **Recurring Expenses**: Set up recurring shared expenses
- **Payment Integration**: Direct payment processing for settlements

## Design Inspiration

Based on the Flik Pay mobile application for UniCredit Bank Slovenia, featuring:
- Instant peer-to-peer payments
- QR code payment processing
- Contact-based transfers
- Real-time transaction updates
- Bank-level security standards
- **Splitwise Integration**: Group expense management and debt settlement

---

Built with ❤️ using React Native and Expo