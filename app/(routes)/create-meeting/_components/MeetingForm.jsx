'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocationOptions from '@/app/_utils/LocationOptions';
import Image from 'next/image';
import Link from 'next/link';
import ThemeOptions from '@/app/_utils/ThemeOptions';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '@/config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function MeetingForm({ setFormValue }) {
	// const [location, setLocation] = useState();
	const [themeColor, setThemeColor] = useState();
	const [eventName, setEventName] = useState();
	const [duration, setDuration] = useState(30);
	const [locationType, setLocationType] = useState();
	const [locationUrl, setLocationUrl] = useState();

	const { user } = useKindeBrowserClient();
	const db = getFirestore(app);

	const router = useRouter();

	useEffect(() => {
		setFormValue({
			eventName: eventName,
			duration: duration,
			locationType: locationType,
			locationUrl: locationUrl,
			themeColor: themeColor,
		});
	}, [eventName, duration, locationType, locationUrl, themeColor]);

	const onCreateClick = async () => {
		const id = Date.now().toString();
		await setDoc(doc(db, 'MeetingEvent', id), {
			id: id,
			eventName: eventName,
			duration: duration,
			locationType: locationType,
			locationUrl: locationUrl,
			themeColor: themeColor,
			businessId: doc(db, 'Business', user?.email),
			createdBy: user?.email,
		}).then((res) => {
			toast('New Meeting Event Created!');
			router.replace('/dashboard/meeting-type');
		});
	};

	return (
		<div className="p-8">
			<Link href={'/dashboard'}>
				<h2 className="flex gap-2">
					<ChevronLeft /> Cancel
				</h2>
			</Link>
			<div className="mt-4">
				<h2 className="font-bold text-2xl my-4">Create New Event</h2>
				<hr />
			</div>
			<div className="flex flex-col gap-3 my-4">
				<h2 className="font-bold">Event Name *</h2>
				<Input
					placeholder="Name of your meeting event"
					onChange={(event) => setEventName(event.target.value)}
				/>

				<h2 className="font-bold">Duration *</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="max-w-40">
							{duration} min
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={() => setDuration(15)}>
							15 min
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDuration(30)}>
							30 min
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDuration(45)}>
							45 min
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setDuration(60)}>
							60 min
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<h2 className="font-bold">Location *</h2>
				<div className="grid grid-cols-4 gap-3">
					{LocationOptions.map((option, index) => (
						<div
							key={index}
							className={`border flex flex-col justify-center items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-primary ${
								location == option.name && 'bg-blue-100 border-primary'
							}`}
							onClick={() => setLocationType(option.name)}
						>
							<Image
								src={option.icon}
								width={30}
								height={30}
								alt={option.name}
							/>
							<h2>{option.name}</h2>
						</div>
					))}
				</div>
				{locationType && (
					<>
						<h2 className="font-bold">Add {locationType} Url *</h2>
						<Input
							placeholder="Add Url"
							onChange={(event) => setLocationUrl(event.target.value)}
						/>
					</>
				)}
				<h2 className="font-bold">Select Theme Color</h2>
				<div className="flex justify-evenly">
					{ThemeOptions.map((theme, index) => (
						<div
							key={index}
							className={`h-7 w-7 rounded-full ${
								themeColor == theme.color && 'border-4 border-black'
							}`}
							style={{ backgroundColor: theme.color }}
							onClick={() => setThemeColor(theme.color)}
						></div>
					))}
				</div>
			</div>

			<Button
				className="w-full mt-9"
				disabled={!eventName || !duration || !locationType || !locationUrl}
				onClick={() => onCreateClick()}
			>
				Create
			</Button>
		</div>
	);
}

export default MeetingForm;
