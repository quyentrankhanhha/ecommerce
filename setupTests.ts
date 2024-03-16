import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

// == you should add the following import: ==
import '@testing-library/jest-dom/vitest'
expect.extend(matchers)
