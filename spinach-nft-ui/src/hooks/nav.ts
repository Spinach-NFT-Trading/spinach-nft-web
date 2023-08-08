'use client';
import React from 'react';

import {navEntries} from '@/const/website';


// Need to "cache" the nav entries (effectively making whatever using nav entries a client component)
// If this is not stored, fast refresh will not work i.e. every page change triggers full reload
export const useNavEntries = () => React.useMemo(() => navEntries, []);
