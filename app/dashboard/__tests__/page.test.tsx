import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import DashboardPage from '../page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock firebase/auth
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}))

// Mock firebase config
jest.mock('@/lib/firebase', () => ({
  auth: {},
}))

describe('DashboardPage', () => {
  let mockPush: jest.Mock
  let mockUnsubscribe: jest.Mock

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()

    mockPush = jest.fn()
    mockUnsubscribe = jest.fn()

    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    ;(onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null)
      return mockUnsubscribe
    })
  })

  it('should redirect to login if user is not authenticated', async () => {
    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should display loading message initially if user is authenticated', async () => {
    ;(onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: 'test-user-123' })
      return mockUnsubscribe
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('🚧 WIP 🚧')).toBeInTheDocument()
    })
  })

  it('should display dashboard content when user is logged in', async () => {
    ;(onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: 'test-user-123' })
      return mockUnsubscribe
    })

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('🚧 WIP 🚧')).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('should call signOut and redirect when logout button is clicked', async () => {
    ;(onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: 'test-user-123' })
      return mockUnsubscribe
    })

    ;(signOut as jest.Mock).mockResolvedValue(undefined)

    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByText('🚧 WIP 🚧')).toBeInTheDocument()
    })

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })

  it('should unsubscribe from auth state on component unmount', async () => {
    const { unmount } = render(<DashboardPage />)

    unmount()

    expect(mockUnsubscribe).toHaveBeenCalled()
  })
})
