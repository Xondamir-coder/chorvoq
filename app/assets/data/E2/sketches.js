import apartmentsSketchImg1 from '~/assets/images/apartments/E2/1.webp';
import apartmentsSketchImg2 from '~/assets/images/apartments/E2/2.webp';
import apartmentsSketchImg3 from '~/assets/images/apartments/E2/3.webp';
import apartmentsSketchImg4 from '~/assets/images/apartments/E2/4.webp';
import apartmentsSketchImg5 from '~/assets/images/apartments/E2/5.webp';
import apartmentsSketchImg6 from '~/assets/images/apartments/E2/6.webp';
import apartmentsSketchImg7 from '~/assets/images/apartments/E2/7.webp';
import { E2apartmentsPaths } from './paths';
import { E2apartments } from './apartments';

export const E2apartmentsSketches = [
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '1',
		img: apartmentsSketchImg1,
		paths: E2apartmentsPaths.find(p => p.floorId == '1'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '1')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '2',
		img: apartmentsSketchImg2,
		paths: E2apartmentsPaths.find(p => p.floorId == '2'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '2')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '3',
		img: apartmentsSketchImg3,
		paths: E2apartmentsPaths.find(p => p.floorId == '3'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '3')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '4',
		img: apartmentsSketchImg4,
		paths: E2apartmentsPaths.find(p => p.floorId == '4'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '4')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '5',
		img: apartmentsSketchImg5,
		paths: E2apartmentsPaths.find(p => p.floorId == '5'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '5')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '6',
		img: apartmentsSketchImg6,
		paths: E2apartmentsPaths.find(p => p.floorId == '6'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '6')
	},
	{
		phaseId: '1',
		blockId: 'E2',
		floorId: '7',
		img: apartmentsSketchImg7,
		paths: E2apartmentsPaths.find(p => p.floorId == '7'),
		apartments: E2apartments.filter(a => a.blockId == 'E2' && a.floorId == '7')
	}
];
